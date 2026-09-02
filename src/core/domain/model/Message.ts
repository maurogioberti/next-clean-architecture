import type { FieldSpec } from "@/core/crosscutting/mapping/Automapper";

export class Message {
  /** Constructor parameters by name, in order: what Automapper reads from the JSON. */
  static readonly FIELDS = ["content"] as const satisfies readonly FieldSpec<Message>[];

  constructor(public readonly content: string) {}
}
