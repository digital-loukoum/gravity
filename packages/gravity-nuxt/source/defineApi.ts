import type { DefineStoreOptions } from "@digitak/gravity/store/defineStore";
import { defineApi as defineVueApi } from "@digitak/gravity-vue/defineApi";
import type { ServicesRecord } from "@digitak/gravity";
import { apiProxy } from "@digitak/gravity/api/apiProxy";
import { encodeProperties } from "@digitak/gravity/utilities/encodeProperties";
import { useAsyncData, useLazyAsyncData } from "nuxt/app";
import { getCacheKey } from "@digitak/gravity/api/getCacheKey.js";

export function defineApi<Services extends ServicesRecord<any>>(
	options: DefineStoreOptions = {},
) {
	const vueApi = defineVueApi<Services>(options);

	const loader = apiProxy<typeof vueApi["api"]>(
		(service, operation, properties) => {
			const body = encodeProperties(properties);
			const key = getCacheKey(service, operation, body);
			return useAsyncData(
				key,
				() =>
					vueApi.resolveApiCall(fetch, service, operation, properties, body),
				{},
			);
		},
	);

	const lazyLoader = apiProxy<typeof vueApi["api"]>(
		(service, operation, properties) => {
			const body = encodeProperties(properties);
			const key = getCacheKey(service, operation, body);
			return useLazyAsyncData(key, () =>
				vueApi.resolveApiCall(fetch, service, operation, properties, body),
			);
		},
	);

	return { ...vueApi, loader, lazyLoader };
}
