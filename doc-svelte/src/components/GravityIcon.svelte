<script lang="ts">
	import { onDestroy } from 'svelte';

	export let size = 36;
	export let dots = 18;
	export let bigDotPosition = 11;
	export let slidingDotAngle = 0.5;
	export let slide = true;
	export let walk = false;

	const dotAngle = (Math.PI * 2) / dots;
	const dotRadius = 40;
	const ringRadius = 24;
	let slider: null | NodeJS.Timer = null;
	let walker: null | NodeJS.Timer = null;

	$: if (slide) {
		if (!slider) {
			slider = setInterval(() => {
				slidingDotAngle = (slidingDotAngle + 0.002) % (2 * Math.PI);
			}, 6);
		}
	} else {
		slider = null;
	}

	$: if (walk) {
		if (!walker) {
			walker = setInterval(() => {
				bigDotPosition = (bigDotPosition - 1) % dots;
			}, 1200);
		}
	} else {
		walker = null;
	}

	const dotX = (position: number) => 60 + dotRadius * Math.cos(position * dotAngle);
	const dotY = (position: number) => 60 + dotRadius * Math.sin(position * dotAngle);

	onDestroy(() => {
		if (slider) clearInterval(slider);
		if (walker) clearInterval(walker);
	});
</script>

<svg width="{size}rem" height="{size}rem" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
	<!-- main center dot -->
	<circle cx="60" cy="60" r="12" fill="#fd5591" />

	<!-- ring -->
	<circle cx="60" cy="60" r={ringRadius} fill="none" stroke="#fd5591" stroke-width="3" />

	<!-- sliding dot -->
	<circle
		cx={60 + ringRadius * Math.cos(slidingDotAngle)}
		cy={60 + ringRadius * Math.sin(slidingDotAngle)}
		r="5"
		fill="#fd5591"
	/>

	<!-- small dots -->
	{#each [...Array(dots).keys()] as dotIndex}
		<circle cx={dotX(dotIndex)} cy={dotY(dotIndex)} r="2" fill="#fd5591" />
	{/each}

	<!-- big dot -->
	<circle cx={dotX(bigDotPosition)} cy={dotY(bigDotPosition)} r="6" fill="#fd5591" />
</svg>
