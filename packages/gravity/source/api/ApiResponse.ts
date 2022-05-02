export type ApiResponse<Data = unknown> =
	| {
			data: Data;
			error?: undefined;
	  }
	| {
			data?: undefined;
			error: Error;
	  };
