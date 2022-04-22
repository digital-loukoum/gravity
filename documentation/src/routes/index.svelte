<script lang="ts">
	import GravityIcon from 'src/components/GravityIcon.svelte';
	import CoreFeatures from 'src/components/mainPage/CoreFeatures.svelte';
	import MainTitle from 'src/components/mainPage/MainTitle.svelte';
</script>

<main>
	<GravityIcon size={320} />
	<MainTitle />
	<CoreFeatures />
</main>

<style lang="sass">
	main
		display: flex
		flex-direction: column
		align-items: center
</style>
