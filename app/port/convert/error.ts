export enum ConvertKind {
  SchemaMismatch = 'SchemaMismatch',
  UnsupportedValue = 'UnsupportedValue',
}
export class ConvertError extends Error {
  constructor(
    public readonly kind: ConvertKind,
    public readonly cause?: unknown,
    msg: string = kind,
  ) {
		super(msg);
	}
}