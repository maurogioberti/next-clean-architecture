import { MessageRepository } from "../domain/repository/MessageRepository";

export class GetMessageUseCase {
  constructor(private repository: MessageRepository) {}

  execute() {
    return this.repository.getMessage();
  }
}