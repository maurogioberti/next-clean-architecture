import type { GetMessageUseCase } from "@/core/application/get-message-usecase";
import type { MessageRepository } from "@/core/domain/repository/MessageRepository";
import type { MessageService } from "@/core/domain/services/MessageService";

import { token } from "./Token";

/**
 * Every dependency the container knows, as typed tokens.
 *
 * A token is the plain string key at runtime and carries the resolved type for
 * the compiler, so `container.resolve(DependencyIdentifiers.USE_CASES.GET_MESSAGE)`
 * is a GetMessageUseCase with no generic argument at the call site.
 */
export const DependencyIdentifiers = {
  SERVICES: {
    MESSAGE: token<MessageService>("MessageService"),
  },
  REPOSITORIES: {
    MESSAGE: token<MessageRepository>("MessageRepository"),
  },
  USE_CASES: {
    GET_MESSAGE: token<GetMessageUseCase>("GetMessageUseCase"),
  },
};
