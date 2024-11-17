import { Message } from "../../domain/model/Message";
import { MessageRepository as MessageRepository } from "../../domain/repository/MessageRepository";

export class MessageRepositoryImpl implements MessageRepository {
  getMessage(): Message {
    return new Message("Hello World! I am implementing Clean Code principles.");
  }
}
