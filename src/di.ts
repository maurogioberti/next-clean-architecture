import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { DependencyIdentifiers } from '@/core/crosscutting/injection/DependencyIdentifiers';
import { MessageServiceImpl } from "@/core/infrastructure/services/MessageServiceImpl";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";

export function setupDependencies() {
  container.register(DependencyIdentifiers.SERVICES.MESSAGE, () => new MessageServiceImpl());
  container.register(DependencyIdentifiers.REPOSITORIES.MESSAGE, () =>
    new MessageRepositoryImpl(container.resolve(DependencyIdentifiers.SERVICES.MESSAGE))
  );
  container.register(DependencyIdentifiers.USE_CASES.GET_MESSAGE, () =>
    new GetMessageUseCase(container.resolve(DependencyIdentifiers.REPOSITORIES.MESSAGE))
  );
}