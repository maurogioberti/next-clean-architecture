import { BaseRepository } from "./base/BaseRepository";
import { Message } from "../../domain/model/Message";
import { MessageRepository as MessageRepository } from "../../domain/repository/MessageRepository";

export class MessageRepositoryImpl extends BaseRepository implements MessageRepository {
  private static readonly DEFAULT_MESSAGE = "Hello World! I am implementing Clean Code principles.";

  getMessage(): Message {
    return new Message(MessageRepositoryImpl.DEFAULT_MESSAGE);
  }
}