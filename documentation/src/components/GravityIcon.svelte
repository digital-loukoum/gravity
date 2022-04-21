<script context="module" lang="ts">
	const dotRadius = 40;
	const ringRadius = 24;
	const slide = true;
	const walk = false;
	const dots = 18;

	const dotAngle = (Math.PI * 2) / dots;
	const dotX = (position: number) => 60 + dotRadius * Math.cos(position * dotAngle);
	const dotY = (position: number) => 60 + dotRadius * Math.sin(position * dotAngle);

	let bigDotPosition = writable(11);
	let slidingDotAngle = writable(0.5);

	if (browser) {
		if (slide) {
			setInterval(() => {
				slidingDotAngle.update((value) => (value + 0.002) % (2 * Math.PI));
			}, 6);
		}

		if (walk) {
			setInterval(() => {
				bigDotPosition.update((value) => (value - 1) % dots);
			}, 1200);
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { writable } from 'svelte/store';

	export let size = 36;
</script>

<svg width="{size}rem" height="{size}rem" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
	<!-- main center dot -->
	<circle cx="60" cy="60" r="12" fill="#fd5591" />

	<!-- ring -->
	<circle cx="60" cy="60" r={ringRadius} fill="none" stroke="#fd5591" stroke-width="3" />

	<!-- sliding dot -->
	<circle
		cx={60 + ringRadius * Math.cos($slidingDotAngle)}
		cy={60 + ringRadius * Math.sin($slidingDotAngle)}
		r="5"
		fill="#fd5591"
	/>

	<!-- small dots -->
	{#each [...Array(dots).keys()] as dotIndex}
		<circle cx={dotX(dotIndex)} cy={dotY(dotIndex)} r="2" fill="#fd5591" />
	{/each}

	<!-- big dot -->
	<circle cx={dotX($bigDotPosition)} cy={dotY($bigDotPosition)} r="6" fill="#fd5591" />
</svg>
