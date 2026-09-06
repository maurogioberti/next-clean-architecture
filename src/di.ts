import { GetMessageUseCase } from "@/core/application/get-message-use-case";
import { DependencyIdentifiers } from "@/core/crosscutting/injection/DependencyIdentifiers";
import {
  container,
  type DependencyInjectionContainer,
} from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";
import { MessageServiceImpl } from "@/core/infrastructure/services/MessageServiceImpl";

/**
 * The composition root: the only file that knows which implementation backs
 * each contract. Factories receive a resolver, so a dependency obtains its own
 * dependencies from the container being configured rather than from a global.
 */
function registerDependencies(target: DependencyInjectionContainer): void {
  // Services
  target.register(DependencyIdentifiers.SERVICES.MESSAGE, () => new MessageServiceImpl());

  // Repositories
  target.register(
    DependencyIdentifiers.REPOSITORIES.MESSAGE,
    (resolver) => new MessageRepositoryImpl(resolver.resolve(DependencyIdentifiers.SERVICES.MESSAGE))
  );

  // Use cases
  target.register(
    DependencyIdentifiers.USE_CASES.GET_MESSAGE,
    (resolver) => new GetMessageUseCase(resolver.resolve(DependencyIdentifiers.REPOSITORIES.MESSAGE))
  );
}

/** Safe to call from any entry point: the container runs the setup at most once. */
export function setupDependencies(): void {
  container.configure(registerDependencies);
}
