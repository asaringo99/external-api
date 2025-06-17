import type { ConvertError } from "../../port/convert/error";
import type { ExternalError } from "../../port/external/error";

export enum FetchErrorKind { External = 'External', Convert = 'Convert' }

export type FetchError =
	| { stack: "fetch", type: FetchErrorKind.External; error: ExternalError }
	| { stack: "fetch", type: FetchErrorKind.Convert; error: ConvertError  };

export const FetchErrorMapping = {
	external: (e: ExternalError): FetchError => ({ stack: "fetch", type: FetchErrorKind.External, error: e }),
	convert:(e: ConvertError ): FetchError => ({ stack: "fetch", type: FetchErrorKind.Convert,  error: e }),
} as const;