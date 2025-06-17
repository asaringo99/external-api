export interface FetchDaemon<Input, Output> {
	execute(input: Input): Promise<Output>
}