import { useHomeViewModel } from "./useHomeViewModel";
import { Message } from "@/core/domain/model/Message";
import { describe, test, expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";

const CONSOLE_ERROR_METHOD = "error";
const ERROR_FETCHING_MESSAGE = "Error fetching message:";
const EXPECTED_CALL_COUNT = 1;

jest.mock("@/core/crosscutting/injection/DependencyInjectionContainer", () => ({
  container: {
    useResolve: jest.fn(),
  },
}));

describe("useHomeViewModel", () => {
  test("should fetch and return a message", async () => {
    const fakeMessageContent = faker.lorem.sentence();
    const mockMessage = new Message(fakeMessageContent);

    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockResolvedValue(mockMessage),
    };

    jest.mocked(container.useResolve).mockReturnValue(getMessageUseCase);

    const result = await useHomeViewModel();

    expect(result.message).toBe(fakeMessageContent);
    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
  });

  test("should set default error message on failure", async () => {
    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockRejectedValue(new Error(faker.string.sample())),
    };

    jest.mocked(container.useResolve).mockReturnValue(getMessageUseCase);
    
    jest.spyOn(console, CONSOLE_ERROR_METHOD).mockImplementation(() => {});

    await useHomeViewModel();

    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
    expect(console.error).toHaveBeenCalledWith(ERROR_FETCHING_MESSAGE, expect.any(Error));
  });
});
