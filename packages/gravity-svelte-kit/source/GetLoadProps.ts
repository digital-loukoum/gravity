import { MaybePromise } from "@digitak/gravity/types/MaybePromise";
import { LoadOutput } from "@sveltejs/kit";

export type GetLoadProps<
	Loader extends (...args: any[]) => MaybePromise<LoadOutput>,
> = Awaited<ReturnType<Loader>>["props"];
