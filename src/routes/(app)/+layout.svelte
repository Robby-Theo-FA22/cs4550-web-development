<script lang="ts">
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
</script>

<!--Layout for the navbar in most of the application-->
<Navbar />
<div class="p-3">
	<slot />
</div>
