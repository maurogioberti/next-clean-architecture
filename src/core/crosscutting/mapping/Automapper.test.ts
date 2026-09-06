import { faker } from "@faker-js/faker";
import { describe, expect, test } from "@jest/globals";

import { Message } from "@/core/domain/model/Message";
import messageData from "@/data/message.json";

import { Automapper, MappingError, toDate, type FieldSpec } from "./Automapper";

class Sample {
  static readonly FIELDS = [
    "name",
    { key: "createdAt", transform: toDate },
    { key: "tags", optional: true },
  ] as const satisfies readonly FieldSpec<Sample>[];

  constructor(
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly tags: string[] = []
  ) {}
}

describe("Automapper", () => {
  test("should map the real message document into the Message entity", () => {
    const message = Automapper.map(messageData, Message);

    expect(message).toBeInstanceOf(Message);
    expect(message.content).toBe(messageData.content);
  });

  test("should read fields by name, regardless of key order in the data", () => {
    const name = faker.person.fullName();
    const createdAt = faker.date.past().toISOString();
    const tags = [faker.word.sample(), faker.word.sample()];

    const fromOrdered = Automapper.map({ name, createdAt, tags }, Sample);
    const fromReversed = Automapper.map({ tags, createdAt, name }, Sample);

    expect(fromReversed).toStrictEqual(fromOrdered);
    expect(fromOrdered.name).toBe(name);
    expect(fromOrdered.tags).toEqual(tags);
  });

  test("should apply the transform so a JSON string becomes a Date", () => {
    const createdAt = faker.date.past();

    const sample = Automapper.map({ name: faker.person.fullName(), createdAt: createdAt.toISOString() }, Sample);

    expect(sample.createdAt).toBeInstanceOf(Date);
    expect(sample.createdAt.getTime()).toBe(createdAt.getTime());
  });

  test("should fall back to the constructor default when an optional field is absent", () => {
    const sample = Automapper.map({ name: faker.person.fullName(), createdAt: faker.date.past() }, Sample);

    expect(sample.tags).toEqual([]);
  });

  test("should fail loudly naming the model and every missing required field", () => {
    const map = () => Automapper.map({}, Sample);

    expect(map).toThrow(MappingError);
    expect(map).toThrow(/Sample/);
    expect(map).toThrow(/name/);
    expect(map).toThrow(/createdAt/);
    expect(map).not.toThrow(/tags/);
  });

  test("toDate should reject a value that is not a date", () => {
    expect(() => toDate(faker.word.sample())).toThrow(TypeError);
  });
});
