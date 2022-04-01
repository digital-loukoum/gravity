<script lang="ts">
	import { fly } from 'svelte/transition';
	export let value: string;
	export let initialDelay = 200;
	export let delay = 160;

	let ghostElement: HTMLSpanElement;
</script>

<span class="ghost" bind:this={ghostElement}>
	{value}
</span>

{#if ghostElement}
	<span class="typewriter" style="margin-left: -{ghostElement.offsetWidth}px">
		{#each value as character, index}
			<span in:fly={{ y: -200, delay: initialDelay + index * delay, duration: 500 }}>
				{character}
			</span>
		{/each}
	</span>
{/if}

<style lang="sass">
	.typewriter
		position: absolute
		display: inline-flex
		width: 0

	.ghost
		opacity: 0
</style>
