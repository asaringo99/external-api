export interface Find<Input, Output> {
	find(input: Input): Promise<Output>
}