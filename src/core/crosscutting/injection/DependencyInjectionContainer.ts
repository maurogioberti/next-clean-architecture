import type { Token } from "./Token";

/** The part of the container a factory may use to obtain its own dependencies. */
export interface Resolver {
  resolve<T>(token: Token<T>): T;
}

export type Factory<T> = (resolver: Resolver) => T;

/**
 * A test double only has to match the public surface of what it replaces;
 * the private members of the real class are not part of that contract.
 */
export type Stub<T> = { [K in keyof T]?: unknown };

export class DependencyInjectionContainer implements Resolver {
  private readonly instances = new Map<string, unknown>();
  private readonly factories = new Map<string, Factory<unknown>>();
  private configured = false;

  register<T>(token: Token<T>, factory: Factory<T>): void {
    this.factories.set(token, factory);
  }

  resolve<T>(token: Token<T>): T {
    if (!this.instances.has(token)) {
      const factory = this.factories.get(token);
      if (!factory) {
        throw new Error(`No factory found for key: ${token}`);
      }
      this.instances.set(token, factory(this));
    }
    return this.instances.get(token) as T;
  }

  has<T>(token: Token<T>): boolean {
    return this.factories.has(token) || this.instances.has(token);
  }

  /**
   * Runs `setup` at most once per container, so the composition root can be
   * imported from any entry point without registering twice.
   */
  configure(setup: (container: DependencyInjectionContainer) => void): void {
    if (this.configured) {
      return;
    }

    setup(this);
    this.configured = true;
  }

  /** Replaces what a token resolves to until `clear()`; meant for tests. */
  override<T>(token: Token<T>, instance: T | Stub<T>): void {
    this.instances.set(token, instance);
  }

  /** Drops resolved instances and overrides; registered factories stay. */
  clear(): void {
    this.instances.clear();
  }
}

// Next evaluates modules more than once on the server: per route segment, per
// worker, and again after a hot reload. A plain module-level singleton would
// give each evaluation its own empty container, and a page could resolve a
// dependency that was registered in a different copy. Parking the instance on
// globalThis makes every evaluation share the same registry.
const globalForDI = globalThis as unknown as {
  __diContainer?: DependencyInjectionContainer;
};

export const container = globalForDI.__diContainer ?? new DependencyInjectionContainer();

if (!globalForDI.__diContainer) {
  globalForDI.__diContainer = container;
}
