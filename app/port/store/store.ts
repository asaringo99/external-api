export interface StoreUpsert<Input, Output> {
	upsert(input: Input): Promise<Output>
}

export interface StoreSelect<Output> {
	select(): Promise<Output>
}
