import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { MessageServiceImpl } from "@/core/infrastructure/services/MessageServiceImpl";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";

export function setupDependencies() {
  container.register(MessageServiceImpl.getInterface(), () => new MessageServiceImpl());
  container.register(MessageRepositoryImpl.getInterface(), () =>
    new MessageRepositoryImpl(container.resolve(MessageServiceImpl.getInterface()))
  );
  container.register(GetMessageUseCase.name, () =>
    new GetMessageUseCase(container.resolve(MessageRepositoryImpl.getInterface()))
  );
}