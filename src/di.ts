import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { MessageServiceImpl } from "@/core/infrastructure/services/MessageServiceImpl";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";

export function setupDependencies() {
  container.register(MessageServiceImpl.name, () => new MessageServiceImpl());
  container.register(MessageRepositoryImpl.name, () =>
    new MessageRepositoryImpl(container.resolve(MessageServiceImpl.name))
  );
  container.register(GetMessageUseCase.name, () =>
    new GetMessageUseCase(container.resolve(MessageRepositoryImpl.name))
  );
}