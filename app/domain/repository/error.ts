import type { ConvertError } from "../../port/convert/error";
import type { StoreError } from "../../port/store/error";

export enum RepositoryErrorKind { Store = 'Store', Convert = 'Convert' }

export type RepositoryError =
	| { stack: "repository", type: RepositoryErrorKind.Store; error: StoreError }
	| { stack: "repository", type: RepositoryErrorKind.Convert; error: ConvertError  };

export const RepositoryErrorMapping = {
	external: (e: StoreError): RepositoryError => ({ stack: "repository", type: RepositoryErrorKind.Store, error: e }),
	convert:(e: ConvertError ): RepositoryError => ({ stack: "repository", type: RepositoryErrorKind.Convert,  error: e }),
} as const;