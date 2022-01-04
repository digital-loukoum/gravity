<script lang="ts">
	import { useApi } from 'src/gravity/api';

	const now = useApi({ network: 'poll', interval: 500 }).time.now();
</script>

Time is: {new Date($now.data).toLocaleTimeString()}
