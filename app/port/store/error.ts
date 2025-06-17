export enum StoreKind {
	Connection = "Connection",
  Timeout = 'Timeout',
	NotFound = "NotFound",
	UnExpected = "UnExpected"
}
export class StoreError extends Error {
  constructor(
    public readonly kind: StoreKind,
    public readonly cause?: unknown,
    msg: string = kind,
  ) {
		super(msg);
	}
}