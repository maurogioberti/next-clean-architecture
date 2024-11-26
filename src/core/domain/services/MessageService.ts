import { Message } from "../model/Message";

export interface MessageService {
  fetchMessage(): Promise<Message>;
}