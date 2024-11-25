import { register } from "ts-injecty";
import { useEventDispatcher } from "@codescouts/ui";

import { GetMessageUseCase } from "@/core/application/get-message-usecase";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";

export const buildDependencies = (builder: typeof register) => {
  return [
    builder(MessageRepositoryImpl.getInterface())
      .withDynamic(() => new MessageRepositoryImpl())
      .build(),

    builder(useEventDispatcher.name)
      .withDynamic(() => useEventDispatcher())
      .build(),

    builder(GetMessageUseCase)
      .withDependency(MessageRepositoryImpl.getInterface())
      .build(),
  ];
};