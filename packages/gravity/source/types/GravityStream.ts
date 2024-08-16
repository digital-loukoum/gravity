import { bunker } from "@digitak/bunker";

export class GravityStream<Data = any> extends ReadableStream<Uint8Array> {
	#controller!: ReadableStreamDefaultController<Uint8Array>;
	#encode: (data: Data) => Uint8Array;

	constructor(start?: (self: GravityStream<Data>) => void, encode = bunker) {
		let controller!: ReadableStreamDefaultController<Uint8Array>;
		super(
			{
				start: (_controller) => {
					controller = _controller;
				},
			},
			{
				size: (chunk) => chunk?.byteLength ?? 0,
			},
		);
		this.#controller = controller;
		this.#encode = encode;
		start?.(this);
	}

	send(data: Data) {
		this.#controller.enqueue(this.#encode(data));
	}

	sendRaw(chunk: Uint8Array) {
		this.#controller.enqueue(chunk);
	}

	close() {
		this.#controller.close();
	}

	error(error: Error) {
		this.#controller.error(error);
	}
}
