<script context="module" lang="ts">
	export async function load({ fetch }) {
		return {
			props: {
				version: await (await fetch('/version')).text()
			}
		};
	}
</script>

<script lang="ts">
	import Header from 'src/components/Header.svelte';
	import Main from 'src/components/Main.svelte';

	export let version: string;
</script>

<Header {version} />
<Main>
	<slot />
</Main>

<style lang="sass">
	@font-face
		font-family: Acherus
		src: url('/Acherus-Grotesque/Acherus-Grotesque-Thin.otf')

	@font-face
		font-family: Readex
		src: url('/ReadexProFont/ReadexPro-Medium.ttf')

	@font-face
		font-family: Anthanista
		src: url('/Anthanista/Anthanista.ttf')

	@font-face
		font-family: ShastaDaily
		src: url('/ShastaDaily/ShastaDaily.otf')

	@font-face
		font-family: Love
		src: url('/Love/Love.ttf')

	@font-face
		font-family: Homeday
		src: url('/Homeday.otf')

	@font-face
		font-family: Simplicity
		src: url('/Simplicity/Simplicity.ttf')

	@font-face
		font-family: Beauty
		src: url('/Beauty/BeautyDemo.ttf')

	:global(:root)
		--header-height: 58rem
		--sidebar-width: 320rem
		--background-color: white
		--border-color: rgba(60, 60, 67, .12)
		--text-color: #2c3e50
		--secondary-text-color: #a2a2d4
		--pale-text-color: #888
		--primary-color: #fd5591

	:global(html)
		font-size: 1px
	
	:global(body)
		font-size: 16rem
		font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
		line-height: 1.5
		color: #333
		color: var(--text-color)
	
	:global(html, body)
		margin: 0

	:global(*)
		box-sizing: border-box

	:global(h1, h2, h3, h4, h5, h6)
		margin: 0 0 0.5em 0
		font-weight: 400
		line-height: 1.8
		font-family: Readex
		letter-spacing: 1.1rem
		color: black
	
	:global(h1, h2, h3, h4, h5, h6, a)
		scroll-margin-top: 90rem

	:global(h1)
		font-size: 2em
	
	:global(h2)
		// padding: 4rem 0
		margin: 36rem 0 16rem
		border-bottom: 1px solid var(--border-color)

	:global(code)
		font-family: menlo, inconsolata, monospace
		font-size: calc(1em - 2px)
		color: #555
		background-color: #f0f0f0
		padding: 0.2em 0.4em
		border-radius: 2px

	:global(p)
		line-height: 1.8
</style>
