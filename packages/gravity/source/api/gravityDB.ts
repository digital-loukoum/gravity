// @ts-ignore
import { openDB } from "idb/build/index.js";

let db: Awaited<ReturnType<typeof openGravityDB>>;

export const openGravityDB = () => openDB("GravityDB");

export const gravityDB = {
	async get<T = unknown>(key: string): Promise<T> {
		db ??= await openGravityDB();
		return await db.get("persisted", key);
	},
	async set(key: string, value: any) {
		db ??= await openGravityDB();
		await db.put("persisted", value, key);
	},
};
