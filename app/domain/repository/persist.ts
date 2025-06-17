export interface Persist<Input, Output> {
	persist(input: Input): Promise<Output>
}