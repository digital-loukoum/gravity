<script lang="ts">
	import DigitalLoukoums from 'src/components/DigitalLoukoums.svelte';

	export let version: string;
</script>

<div class="signature">
	<div class="version">
		Gravity {version}
	</div>
	<DigitalLoukoums />
</div>

<style lang="sass">
	.signature
		display: flex
		flex-direction: column
		gap: 20px
		align-items: center
		margin: 120px
	
	.version
		font-family: Readex
</style>
