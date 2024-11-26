import { BaseRepository } from "./BaseRepository";
import { describe, test, expect } from "@jest/globals";

describe("BaseRepository", () => {
  test("getInterface should return the interface name by removing 'Impl' suffix from the class name", () => {
    class TestRepositoryImpl extends BaseRepository {}
    const result = TestRepositoryImpl.getInterface();
    const expectedInterfaceName = "TestRepository";
    expect(result).toBe(expectedInterfaceName);
  });
});