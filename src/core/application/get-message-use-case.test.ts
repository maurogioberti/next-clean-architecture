import { MessageRepository } from "@/core/domain/repository/MessageRepository";
import { GetMessageUseCase } from "./get-message-use-case";
import { Message } from "@/core/domain/model/Message";
import { describe, test, expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

const EXPECTED_CALL_COUNT = 1;

describe("GetMessageUseCase", () => {
  test("should retrieve a message from the repository", async () => {
    const fakeMessageContent = faker.lorem.sentence();
    const mockMessage = new Message(fakeMessageContent);

    const messageRepository: MessageRepository = {
      getMessage: jest.fn<() => Promise<Message>>().mockResolvedValue(mockMessage),
    };

    const useCase = new GetMessageUseCase(messageRepository);
    const result = await useCase.execute();

    expect(messageRepository.getMessage).toHaveBeenCalledTimes(
      EXPECTED_CALL_COUNT
    );
    expect(result.content).toBe(fakeMessageContent);
  });
});