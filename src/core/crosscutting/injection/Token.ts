declare const TOKEN_BRAND: unique symbol;

/**
 * A dependency identifier that carries the type it resolves to.
 *
 * At runtime it is a plain string, so registrations, error messages and test
 * doubles work with ordinary keys. The brand exists only for the compiler:
 * `container.resolve(token)` infers the dependency type from the token, and a
 * token of the wrong type is rejected at the call site instead of surfacing
 * later as an `undefined` method.
 */
export type Token<T> = string & { readonly [TOKEN_BRAND]?: T };

export function token<T>(key: string): Token<T> {
  return key as Token<T>;
}
