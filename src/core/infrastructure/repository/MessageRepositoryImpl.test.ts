import { MessageRepositoryImpl } from "./MessageRepositoryImpl";
import { describe, test, expect } from "@jest/globals";

const EXPECTED_MESSAGE = "Hello World! I am implementing Clean Code principles.";

describe("MessageRepositoryImpl", () => {
  test("should return a predefined message", () => {
    const repository = new MessageRepositoryImpl();
    const result = repository.getMessage();

    expect(result.content).toBe(EXPECTED_MESSAGE);
  });
});