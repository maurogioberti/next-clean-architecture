import { Message } from "../../domain/model/Message";
import { MessageService } from "../../domain/services/MessageService";
import { BaseService } from "./base/BaseService";

export class MessageServiceImpl extends BaseService implements MessageService {
  private static readonly MESSAGE_FILE: string = "message";

  async fetchMessage(): Promise<Message> {
    return this.fetchData<Message>(MessageServiceImpl.MESSAGE_FILE);
  }
}
