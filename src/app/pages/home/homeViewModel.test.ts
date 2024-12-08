import { homeViewModel } from "./homeViewModel";
import { Message } from "@/core/domain/model/Message";
import { describe, test, expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { DependencyIdentifiers } from "@/core/crosscutting/injection/DependencyIdentifiers";

const CONSOLE_ERROR_METHOD = "error";
const ERROR_FETCHING_MESSAGE = "Error fetching message:";
const EXPECTED_CALL_COUNT = 1;

jest.mock("@/core/crosscutting/injection/DependencyInjectionContainer", () => ({
  container: {
    resolve: jest.fn(),
  },
}));

describe("homeViewModel", () => {
  test("should fetch and return a message", async () => {
    const fakeMessageContent = faker.lorem.sentence();
    const mockMessage = new Message(fakeMessageContent);

    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockResolvedValue(mockMessage),
    };

    (container.resolve as jest.Mock).mockImplementation((useCase) => {
      if (useCase === DependencyIdentifiers.USE_CASES.GET_MESSAGE) return getMessageUseCase;
      return undefined;
    });

    const result = await homeViewModel();

    expect(result.message).toBe(fakeMessageContent);
    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
  });

  test("should log an error and set default error message on failure", async () => {
    const error = new Error(faker.string.sample());
    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockRejectedValue(error),
    };

    (container.resolve as jest.Mock).mockImplementation((useCase) => {
      if (useCase === DependencyIdentifiers.USE_CASES.GET_MESSAGE) return getMessageUseCase;
      return undefined;
    });

    const consoleErrorSpy = jest.spyOn(console, CONSOLE_ERROR_METHOD).mockImplementation(() => {});

    await homeViewModel();

    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
    expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_FETCHING_MESSAGE, error);

    consoleErrorSpy.mockRestore();
  });
});