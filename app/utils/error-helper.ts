export function assertNever(_: never): never {
  throw new Error('unreachable');
}

export type ApplicationError<K extends string, P = void> = Error & { kind: K } & ( P extends void ? unknown : P );

/**
 * 拡張プロパティ付きでErrorを生成する
 */
export function createFetchDaemonError<
  K extends string,
  P extends Record<string, unknown> | void = void,
>(
  kind: K,
  message: string = kind,
  props?: P,
  cause?: unknown,
): ApplicationError<K, P> {
  const err = new Error(message, cause ? { cause } : undefined) as Error & { kind: K; cause?: unknown };
  err.kind = kind;
  if (cause) err.cause = cause;
  if (props && props !== (undefined as unknown)) {
    Object.assign(err, props);
  }
  return err as typeof err & (P extends void ? unknown : P);
}