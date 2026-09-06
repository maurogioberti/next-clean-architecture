/**
 * Maps plain data (the JSON under src/data) onto a domain model whose
 * constructor takes positional parameters.
 *
 * The model declares its constructor parameters by NAME, in declaration order,
 * in a static `FIELDS` list. Values are read from the data by name, so the key
 * order of a JSON file is irrelevant: reordering, adding or omitting keys in
 * the data can never shift a value into the wrong constructor parameter.
 *
 * A required field missing from the data fails the build with the model name
 * and the missing keys, instead of surfacing later as `undefined` inside a
 * rendered page. A field can also carry a transform, the one place where a
 * JSON string becomes a `Date`, so the model's declared types hold at runtime.
 */

export type FieldName<TModel> = Extract<keyof TModel, string>;

export interface FieldOptions<TModel> {
  readonly key: FieldName<TModel>;
  /** An optional field may be absent from the data; the constructor default then applies. */
  readonly optional?: boolean;
  /** Converts the raw value before it reaches the constructor. */
  readonly transform?: (value: unknown) => unknown;
}

export type FieldSpec<TModel> = FieldName<TModel> | FieldOptions<TModel>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Constructor<TModel> = new (...args: any[]) => TModel;

export type MappableModel<TModel> = Constructor<TModel> & {
  /** Constructor parameters by name, in the constructor's declaration order. */
  readonly FIELDS: readonly FieldSpec<TModel>[];
};

export class MappingError extends Error {
  constructor(modelName: string, missing: readonly string[], received: readonly string[]) {
    super(
      `Cannot map ${modelName}: missing required field(s) ${missing.join(", ")}. ` +
        `Received keys: ${received.length > 0 ? received.join(", ") : "(none)"}.`
    );
    this.name = "MappingError";
  }
}

export class Automapper {
  static map<TModel>(data: object, Model: MappableModel<TModel>): TModel {
    const record = data as Record<string, unknown>;
    const missing: string[] = [];

    const args = Model.FIELDS.map((spec) => {
      const options: FieldOptions<TModel> = typeof spec === "string" ? { key: spec } : spec;
      const { key, optional = false, transform } = options;
      const value = record[key];

      if (value === undefined) {
        if (!optional) {
          missing.push(key);
        }

        return undefined;
      }

      return transform ? transform(value) : value;
    });

    if (missing.length > 0) {
      throw new MappingError(Model.name, missing, Object.keys(record));
    }

    return new Model(...args);
  }
}

/** Accepts a `Date` or anything `Date` can parse, and rejects an invalid date loudly. */
export function toDate(value: unknown): Date {
  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`Expected a date, received ${JSON.stringify(value)}.`);
  }

  return date;
}
