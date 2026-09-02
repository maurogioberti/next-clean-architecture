import { Message } from "../../domain/model/Message";
import { MessageRepository } from "../../domain/repository/MessageRepository";
import { MessageService } from "../../domain/services/MessageService";
import { BaseRepository } from "./base/BaseRepository";

export class MessageRepositoryImpl extends BaseRepository implements MessageRepository {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  async getMessage(): Promise<Message> {
    const rawMessage = await this.messageService.fetchMessage();
    return new Message(rawMessage.content);
  }
}
