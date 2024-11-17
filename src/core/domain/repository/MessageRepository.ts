import { Message } from "../model/Message";


export interface MessageRepository {
  getMessage(): Message;
}
