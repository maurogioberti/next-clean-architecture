import { Automapper } from "@/core/crosscutting/mapping/Automapper";

import { Message } from "../../domain/model/Message";
import { MessageRepository } from "../../domain/repository/MessageRepository";
import { MessageService } from "../../domain/services/MessageService";

export class MessageRepositoryImpl implements MessageRepository {
  constructor(private readonly messageService: MessageService) {}

  async getMessage(): Promise<Message> {
    const rawMessage = await this.messageService.fetchMessage();
    return Automapper.map(rawMessage, Message);
  }
}
