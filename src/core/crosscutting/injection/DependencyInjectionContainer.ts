export class DependencyInjectionContainer {
    private factories = new Map<string, () => unknown>();
    private instances = new Map<string, unknown>();
  
    register<T>(key: string, factory: () => T): void {
      this.factories.set(key, factory);
    }
  
    resolve<T>(key: string): T {
      if (!this.instances.has(key)) {
        const factory = this.factories.get(key) as (() => T) | undefined;
        if (!factory) {
          throw new Error(`No factory found for key: ${key}`);
        }
        const instance = factory();
        this.instances.set(key, instance);
      }
      return this.instances.get(key) as T;
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    useResolve<T>(ctor: new (...args: any[]) => T): T {
      return this.resolve<T>(ctor.name);
    }
  }
  
  export const container = new DependencyInjectionContainer();