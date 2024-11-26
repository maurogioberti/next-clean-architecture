import { renderHook } from "@testing-library/react";
import { mock } from "@codescouts/test/jest";
import { useResolve } from "@codescouts/di";
import { useHomeViewModel } from "./useHomeViewModel";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";
import { Message } from "@/core/domain/model/Message";
import { describe, test, expect, jest } from "@jest/globals";
import { waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";

const EXPECTED_CALL_COUNT = 1;
const DEFAULT_ERROR_MESSAGE = "Error loading message";

jest.spyOn(console, "error").mockImplementation(() => {});
jest.mock("@codescouts/di", () => ({
  useResolve: jest.fn(),
}));

describe("useHomeViewModel", () => {
  test("should fetch and return a message", async () => {
    const fakeMessage = faker.lorem.sentence();
    const mockMessage = new Message(fakeMessage);

    const getMessageUseCase = mock<GetMessageUseCase>({
      execute: jest.fn<() => Promise<Message>>().mockResolvedValue(mockMessage),
    });

    jest.mocked(useResolve).mockReturnValue(getMessageUseCase);

    const { result } = renderHook(() => useHomeViewModel());

    await waitFor(() => {
      expect(result.current.message).toBe(fakeMessage);
    });

    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(
      EXPECTED_CALL_COUNT
    );
  });

  test("should set default error message on failure", async () => {
    const getMessageUseCase = mock<GetMessageUseCase>({
      execute: jest
        .fn<() => Promise<Message>>()
        .mockRejectedValue(new Error(faker.hacker.phrase())),
    });

    jest.mocked(useResolve).mockReturnValue(getMessageUseCase);

    const { result } = renderHook(() => useHomeViewModel());

    await waitFor(() => {
      expect(result.current.message).toBe(DEFAULT_ERROR_MESSAGE);
    });

    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(
      EXPECTED_CALL_COUNT
    );
  });
});