export interface ExternalRequest<Req, Res> {
	execute(input: Req): Promise<Res>
}

