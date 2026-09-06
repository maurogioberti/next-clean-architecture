import { faker } from "@faker-js/faker";
import { afterEach, describe, expect, jest, test } from "@jest/globals";

import { DependencyIdentifiers } from "@/core/crosscutting/injection/DependencyIdentifiers";
import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { Message } from "@/core/domain/model/Message";

import { DEFAULT_MESSAGE, ERROR_MESSAGE_PREFIX, homeViewModel } from "./homeViewModel";

const EXPECTED_CALL_COUNT = 1;

describe("homeViewModel", () => {
  afterEach(() => {
    // override() lives until clear(), so each test starts from an empty container.
    container.clear();
    jest.restoreAllMocks();
  });

  test("should fetch and return a message", async () => {
    const fakeMessageContent = faker.lorem.sentence();
    const execute = jest.fn<() => Promise<Message>>().mockResolvedValue(new Message(fakeMessageContent));
    container.override(DependencyIdentifiers.USE_CASES.GET_MESSAGE, { execute });

    const result = await homeViewModel();

    expect(result.message).toBe(fakeMessageContent);
    expect(execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
  });

  test("should log the error and fall back to the default message on failure", async () => {
    const error = new Error(faker.string.sample());
    const execute = jest.fn<() => Promise<Message>>().mockRejectedValue(error);
    container.override(DependencyIdentifiers.USE_CASES.GET_MESSAGE, { execute });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = await homeViewModel();

    expect(result.message).toBe(DEFAULT_MESSAGE);
    expect(execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
    expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MESSAGE_PREFIX, error);
  });
});
