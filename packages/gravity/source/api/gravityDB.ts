import { get, set, createStore } from "idb-keyval/dist/index.js";

let db: ReturnType<typeof createStore>;

export const openGravityDB = async () => createStore("gravityDB", "store");

export const gravityDB = {
	async get<T = unknown>(key: string): Promise<T | undefined> {
		db ??= await openGravityDB();
		return await get<T>(key, db);
	},
	async set(key: string, value: any) {
		db ??= await openGravityDB();
		await set(key, value, db);
	},
};
