<script lang="ts">
	export let title: string;
	export let loading: boolean;
	export let refreshing: boolean;
	export let data: unknown;
	export let error: unknown;

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
</script>

<card style={cardStyle}>
	<h2 style={titleStyle}>
		{title}
	</h2>

	<div style={itemStyle}>
		<span style={labelStyle}>Loading</span>
		<span>{loading}</span>
	</div>

	<div style={itemStyle}>
		<span style={labelStyle}>Refreshing</span>
		<span>{refreshing}</span>
	</div>

	<div style={itemStyle}>
		<span style={labelStyle}>data</span>
		<span>{data}</span>
	</div>

	<div style={itemStyle}>
		<span style={labelStyle}>error</span>
		<span>{error}</span>
	</div>
</card>
