import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

import { container, DependencyInjectionContainer } from "./DependencyInjectionContainer";
import { token } from "./Token";

interface Counter {
  id: number;
}

describe("DependencyInjectionContainer", () => {
  let sut: DependencyInjectionContainer;

  beforeEach(() => {
    sut = new DependencyInjectionContainer();
  });

  test("should register and resolve a dependency, typed by its token", () => {
    const VALUE = token<{ value: number }>(faker.string.uuid());
    const value = faker.number.int();

    sut.register(VALUE, () => ({ value }));

    // No generic argument: the type comes from the token.
    expect(sut.resolve(VALUE).value).toBe(value);
  });

  test("should return the same instance on every resolve", () => {
    const COUNTER = token<Counter>(faker.string.uuid());
    let created = 0;

    sut.register(COUNTER, () => ({ id: ++created }));

    expect(sut.resolve(COUNTER)).toBe(sut.resolve(COUNTER));
    expect(created).toBe(1);
  });

  test("should throw, naming the key, when nothing is registered for a token", () => {
    const key = faker.string.uuid();

    expect(() => sut.resolve(token<unknown>(key))).toThrow(`No factory found for key: ${key}`);
  });

  test("should keep different tokens apart", () => {
    const FIRST = token<string>(faker.string.uuid());
    const SECOND = token<string>(faker.string.uuid());
    const firstValue = faker.word.sample();
    const secondValue = faker.word.sample();

    sut.register(FIRST, () => firstValue);
    sut.register(SECOND, () => secondValue);

    expect(sut.resolve(FIRST)).toBe(firstValue);
    expect(sut.resolve(SECOND)).toBe(secondValue);
  });

  test("should hand the factory a resolver so dependencies compose without a global", () => {
    const LEAF = token<number>(faker.string.uuid());
    const ROOT = token<{ leaf: number }>(faker.string.uuid());
    const leaf = faker.number.int();

    sut.register(LEAF, () => leaf);
    sut.register(ROOT, (resolver) => ({ leaf: resolver.resolve(LEAF) }));

    expect(sut.resolve(ROOT)).toEqual({ leaf });
  });

  test("should report whether a token is known", () => {
    const KNOWN = token<number>(faker.string.uuid());
    const UNKNOWN = token<number>(faker.string.uuid());

    sut.register(KNOWN, () => 1);

    expect(sut.has(KNOWN)).toBe(true);
    expect(sut.has(UNKNOWN)).toBe(false);
  });

  test("should run configure at most once, with the container", () => {
    const setup = jest.fn<(target: DependencyInjectionContainer) => void>();

    sut.configure(setup);
    sut.configure(setup);

    expect(setup).toHaveBeenCalledTimes(1);
    expect(setup).toHaveBeenCalledWith(sut);
  });

  test("should let override replace what a token resolves to until clear()", () => {
    const GREETER = token<{ greet: () => string }>(faker.string.uuid());

    sut.register(GREETER, () => ({ greet: () => "real" }));
    sut.override(GREETER, { greet: () => "fake" });

    expect(sut.resolve(GREETER).greet()).toBe("fake");

    sut.clear();

    expect(sut.resolve(GREETER).greet()).toBe("real");
  });

  test("should drop resolved instances on clear so the factory runs again", () => {
    const COUNTER = token<Counter>(faker.string.uuid());
    let created = 0;

    sut.register(COUNTER, () => ({ id: ++created }));

    const first = sut.resolve(COUNTER);
    sut.clear();
    const second = sut.resolve(COUNTER);

    expect(first.id).toBe(1);
    expect(second.id).toBe(2);
    expect(first).not.toBe(second);
  });

  test("should share one container across module re-evaluation", async () => {
    const SHARED = token<string>(faker.string.uuid());
    const value = faker.word.sample();
    container.register(SHARED, () => value);

    let reEvaluatedContainer: DependencyInjectionContainer | undefined;
    await jest.isolateModulesAsync(async () => {
      const reEvaluatedModule = await import("./DependencyInjectionContainer");
      reEvaluatedContainer = reEvaluatedModule.container;
    });

    expect(reEvaluatedContainer).toBe(container);
    expect(reEvaluatedContainer?.resolve(SHARED)).toBe(value);
  });
});
