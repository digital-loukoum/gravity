<script setup lang="ts">
import { ApiResponse } from "@digitak/gravity";
import { computed, ref, watch } from "vue";
import { api, store } from "./api";
import RequestCard from "./components/RequestCard.vue";

const a = ref(2);
const b = ref(3);

const isApiLoading = ref(true);
const apiResult = ref<ApiResponse<number> | undefined>();

const refreshApi = async () => {
	apiResult.value = undefined;
	isApiLoading.value = true;
	apiResult.value = await api.math.add(+a.value, +b.value);
	isApiLoading.value = false;
};

const storeSum = computed(() => store.math.add(+a.value, +b.value))

refreshApi();

watch([a, b], refreshApi);
</script>

<template>
	<p>a = <input v-model="a" /></p>
	<p>b = <input v-model="b" /></p>

	<RequestCard
		title="Api sum"
		:loading="isApiLoading"
		:refreshing="isApiLoading"
		:data="apiResult?.data"
		:error="apiResult?.error"
	/>

	<RequestCard
		title="Store sum"
		:loading="storeSum.isLoading"
		:refreshing="storeSum.isRefreshing"
		:data="storeSum.data"
		:error="storeSum.error"
	/>
</template>
