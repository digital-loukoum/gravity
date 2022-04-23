<script lang="ts">
	import { apiStore } from 'src/gravity/api';

	const now = apiStore({ network: 'poll', interval: 500 }).time.now();
</script>

Time is: {new Date($now.data).toLocaleTimeString()}
