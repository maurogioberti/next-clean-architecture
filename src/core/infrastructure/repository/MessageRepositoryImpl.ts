import { BaseRepository } from "./base/BaseRepository";
import { Message } from "../../domain/model/Message";
import { MessageRepository } from "../../domain/repository/MessageRepository";
import { MessageService } from "../../domain/services/MessageService";

export class MessageRepositoryImpl extends BaseRepository implements MessageRepository {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    super();
    this.messageService = messageService;
  }

  async getMessage(): Promise<Message> {
    const message = await this.messageService.fetchMessage();
    return message;
  }
}