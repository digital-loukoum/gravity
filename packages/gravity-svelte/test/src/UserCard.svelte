<script lang="ts">
	const cardStyle = `
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		width: 320px;
		border: 1px solid #ddd;
		background-color: white;
		border-radius: 12px;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
		padding: 16px;
		margin: 16px;
		gap: 16px;
	`;

	const titleStyle = `
		text-align: center;
		margin: 0;
	`;

	const itemStyle = `
		display: flex;
		justify-content: space-between;
	`;

	const labelStyle = `
		font-weight: bold;
	`;

	export let id: string;
	export let email: string;
	export let name: string;
	export let updateEmail: (email: string) => void;

	let newEmail = email;
</script>

<card style={cardStyle}>
	<h2 style={titleStyle}>{name}</h2>

	<div style={itemStyle}>
		<span style={labelStyle}>Id</span>
		<span>{id}</span>
	</div>

	<div style={itemStyle}>
		<span style={labelStyle}>Email</span>
		<input bind:value={newEmail} />
	</div>

	{#if newEmail != email}
		<button on:click={() => updateEmail(newEmail)}>Update email</button>
	{/if}
</card>
