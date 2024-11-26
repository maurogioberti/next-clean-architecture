import { register } from "ts-injecty";
import { useEventDispatcher } from "@codescouts/ui";

import { GetMessageUseCase } from "@/core/application/get-message-usecase";
import { MessageRepositoryImpl } from "@/core/infrastructure/repository/MessageRepositoryImpl";
import { MessageServiceImpl } from "@/core/infrastructure/services/MessageServiceImpl";

export const buildDependencies = (builder: typeof register) => {
  return [
    builder(useEventDispatcher.name)
      .withDynamic(() => useEventDispatcher())
      .build(),

    builder(MessageServiceImpl.getInterface())
      .withDynamic(() => new MessageServiceImpl())
      .build(),

    builder(MessageRepositoryImpl.getInterface())
      .withDynamic(() => new MessageRepositoryImpl(new MessageServiceImpl()))
      .build(),

    builder(GetMessageUseCase)
      .withDependency(MessageRepositoryImpl.getInterface())
      .build(),
  ];
};
