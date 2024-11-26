import { MessageRepositoryImpl } from "./MessageRepositoryImpl";
import { MessageService } from "../../domain/services/MessageService";
import { Message } from "../../domain/model/Message";
import { describe, test, expect, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

describe("MessageRepositoryImpl", () => {
  test("should return a dynamically generated message", async () => {
    const dynamicMessage = faker.lorem.sentence();
    const mockMessageService: MessageService = {
      fetchMessage: jest.fn<() => Promise<Message>>().mockResolvedValue(new Message(dynamicMessage)),
    };

    const repository = new MessageRepositoryImpl(mockMessageService);
    const result = await repository.getMessage();

    expect(result.content).toBe(dynamicMessage);
  });
});