<script setup lang="ts">
import { api } from "../../../api"
const { data } = await useAsyncData("meow", () => api.cat.meow(), { server: false })
</script>

<template>Cat says: {{ data }}</template>