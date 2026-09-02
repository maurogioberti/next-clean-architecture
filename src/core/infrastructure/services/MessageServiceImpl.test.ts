import { describe, expect, test } from "@jest/globals";

import message from "@/data/message.json";

import { MessageServiceImpl } from "./MessageServiceImpl";

describe("MessageServiceImpl", () => {
  test("should load the message document from src/data", async () => {
    const service = new MessageServiceImpl();

    const result = await service.fetchMessage();

    expect(result).toEqual(message);
  });
});
