export type ApiResponse<Data = unknown> =
	| {
			data: Awaited<Data>;
			error?: undefined;
	  }
	| {
			data?: undefined;
			error: Error;
	  };
