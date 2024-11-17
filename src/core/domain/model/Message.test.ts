import { Message } from "./Message";
import { describe, test, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";

describe("Message", () => {
  test("should store the provided content", () => {
    const fakeContent = faker.lorem.sentence();
    const message = new Message(fakeContent);
    expect(message.content).toBe(fakeContent);
  });
});