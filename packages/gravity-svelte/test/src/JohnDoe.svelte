<script lang="ts">
	import type { Store } from "@digitak/gravity-svelte/Store";
	import type { User } from "../../../gravity/test/server/services/user";
	import UserCard from "./UserCard.svelte";

	export let john: Store<User>;
	export let updateEmail: (email: string) => void;
</script>

{#if $john.isLoading}
	John is loading...
{:else if $john.error}
	Error loading John: {$john.error}
{:else}
	<UserCard {...$john.data} {updateEmail} />
{/if}
