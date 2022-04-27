<script setup lang="ts">
  import { ApiResponse } from '@digitak/gravity';
import { ref, watch } from 'vue';
import { api } from './api';
  import RequestCard from './components/RequestCard.vue';

  const a = ref(2);
  const b = ref(3);

	const isApiLoading = ref(true);
  const apiResult = ref<ApiResponse<number> | undefined>()

  const refreshApi = async () => {
    apiResult.value = undefined
    isApiLoading.value = true
    apiResult.value = await api.math.add(+a.value, +b.value)
    isApiLoading.value = false
  }

  refreshApi()
  watch([a, b], refreshApi)
</script>

<template>
  <p>
    a = <input v-model="a"/>
  </p>
  <p>
    b = <input v-model="b" />
  </p> 

  <RequestCard
    title="Api sum"
    :loading="isApiLoading"
    :refreshing="isApiLoading"
    :data="apiResult?.data"
    :error="apiResult?.error"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
