import { BaseService } from "./base/BaseService";
import { MessageService } from "../../domain/services/MessageService";
import { Message } from "../../domain/model/Message";

export class MessageServiceImpl extends BaseService implements MessageService {
  private static readonly MESSAGE_API_URL: string = "https://run.mocky.io/v3/c1c6aa61-e952-4f96-bc2a-5ab1cf97f4a7";

  async fetchMessage(): Promise<Message> {
    const response = await fetch(MessageServiceImpl.MESSAGE_API_URL);
    const data: Message = await response.json();
    return data;
  }
}