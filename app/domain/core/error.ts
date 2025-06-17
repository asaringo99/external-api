import { assertNever } from "../../utils/error-helper";
import type { FetchError } from "../connector/error";
import type { RepositoryError } from "../repository/error";

export enum FetchDaemonType { Fetch = 'Fetch', Repository = 'Repository' }

export type FetchDaemonError =
	| { type: FetchDaemonType.Fetch; error: FetchError  }
  | { type: FetchDaemonType.Repository; error: RepositoryError };

export const FetchDaemonErrorMapping = {
  fetchErr: (e: FetchError): FetchDaemonError => ({ type: FetchDaemonType.Fetch, error: e }),
  repositoryErr:(e: RepositoryError ): FetchDaemonError => ({ type: FetchDaemonType.Repository,  error: e }),
} as const;

interface ISiteControllerError {
	tag: string
}

export type SiteControllerError<P extends ISiteControllerError = ISiteControllerError> =
  FetchDaemonError & { siteController: P["tag"] };

export function wrapSiteControllerError<P extends ISiteControllerError>(
  siteController: P,
  err: RepositoryError | FetchError,
): SiteControllerError<P> {
	switch (err.stack) {
		case "fetch":
			return { siteController: siteController["tag"], ...FetchDaemonErrorMapping.fetchErr(err) };
		case "repository":
			return { siteController: siteController["tag"], ...FetchDaemonErrorMapping.repositoryErr(err) };
		default:
			return assertNever(err);
	}
}