export interface Fetch<Input, Output> {
	fetch(input: Input): Promise<Output>
}