<script setup lang="ts">
	defineProps<{
		title: string;
		loading: boolean;
		refreshing: boolean;
		data: unknown;
		error: unknown;
	}>()

	const cardStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "flex-start",
		width: "320px",
		border: "1px solid #ddd",
		backgroundColor: "white",
		borderRadius: "12px",
		boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
		padding: "16px",
		margin: "16px",
		gap: "16px",
	} as const;

	const titleStyle = {
		textAlign: "center",
		margin: 0,
	} as const;

	const itemStyle = {
		display: "flex",
		justifyContent: "space-between",
	} as const;

	const labelStyle = {
		fontWeight: "bold",
	} as const;
</script>

<template>
	<div :style="cardStyle">
		<h2 :style="titleStyle">
			{{title}}
		</h2>

		<div :style="itemStyle">
			<span :style="labelStyle">Loading</span>
			<span>{{loading}}</span>
		</div>

		<div :style="itemStyle">
			<span :style="labelStyle">Refreshing</span>
			<span>{{refreshing}}</span>
		</div>

		<div :style="itemStyle">
			<span :style="labelStyle">data</span>
			<span>{{data ?? 'undefined'}}</span>
		</div>

		<div :style="itemStyle">
			<span :style="labelStyle">error</span>
			<span>{{error ?? 'undefined'}}</span>
		</div>
	</div>
</template>

