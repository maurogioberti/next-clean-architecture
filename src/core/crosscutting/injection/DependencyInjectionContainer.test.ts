import { DependencyInjectionContainer } from "./DependencyInjectionContainer";
import { describe, test, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";

describe("DependencyInjectionContainer", () => {
  test("should register and resolve a dependency", () => {
    const container = new DependencyInjectionContainer();
    const dependencyKey = faker.lorem.word();
    const dependencyValue = faker.number.int();

    container.register(dependencyKey, () => ({ value: dependencyValue }));
    const resolvedInstance = container.resolve<{ value: number }>(dependencyKey);

    expect(resolvedInstance).toEqual({ value: dependencyValue });
  });

  test("should return the same instance for multiple resolves", () => {
    const container = new DependencyInjectionContainer();
    let instanceCreationCount = 0;
    const singletonKey = faker.lorem.word();
    const EXPECTED_INSTANCE_CREATION_COUNT = 1;

    container.register(singletonKey, () => {
      instanceCreationCount++;
      return { id: instanceCreationCount };
    });

    const firstInstance = container.resolve(singletonKey);
    const secondInstance = container.resolve(singletonKey);

    expect(firstInstance).toBe(secondInstance);
    expect(instanceCreationCount).toBe(EXPECTED_INSTANCE_CREATION_COUNT);
  });

  test("should throw error when resolving unregistered key", () => {
    const container = new DependencyInjectionContainer();
    const unregisteredKey = faker.lorem.word();
    const EXPECTED_ERROR_MESSAGE = `No factory found for key: ${unregisteredKey}`;

    expect(() => container.resolve(unregisteredKey)).toThrowError(EXPECTED_ERROR_MESSAGE);
  });

  test("debe soportar múltiples claves diferentes", () => {
    const container = new DependencyInjectionContainer();
    const firstDependencyKey = faker.lorem.word();
    const secondDependencyKey = faker.lorem.word();
    const firstDependencyValue = faker.word.sample();
    const secondDependencyValue = faker.word.sample();

    container.register(firstDependencyKey, () => firstDependencyValue);
    container.register(secondDependencyKey, () => secondDependencyValue);

    expect(container.resolve(firstDependencyKey)).toBe(firstDependencyValue);
    expect(container.resolve(secondDependencyKey)).toBe(secondDependencyValue);
  });

  test("should throw error when resolving unregistered key", () => {
    const container = new DependencyInjectionContainer();
    const userDependencyKey = faker.lorem.word();
    const userDependencyValue = {
      name: faker.person.fullName(),
      age: faker.number.int(),
    };

    container.register(userDependencyKey, () => userDependencyValue);
    const resolvedUser = container.resolve<{ name: string; age: number }>(userDependencyKey);

    expect(resolvedUser).toEqual(userDependencyValue);
  });
});