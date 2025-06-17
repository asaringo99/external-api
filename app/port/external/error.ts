export enum ExternalKind {
  Timeout = 'Timeout',
  Unauthorized = 'Unauthorized',
  InvalidPayload = 'InvalidPayload',
  Unavailable = 'Unavailable',
	UnExpected = "UnExpected"
}
export class ExternalError extends Error {
  constructor(
    public readonly kind: ExternalKind,
    public readonly cause?: unknown,
    msg: string = kind,
  ) {
		super(msg);
	}
}