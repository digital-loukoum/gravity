export type ApiResponse<Data = unknown> =
	| {
			data: Data;
	  }
	| {
			error: Error;
	  };
