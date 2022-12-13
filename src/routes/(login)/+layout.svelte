<script lang="ts">
	import NavBrand from '$lib/components/Navbar/NavBrand.svelte';
	import NavCollapseToggler from '$lib/components/Navbar/NavCollapseToggler.svelte';
	import NavItem from '$lib/components/Navbar/NavItem.svelte';
	import NavItemGroup from '$lib/components/Navbar/NavItemGroup.svelte';
</script>

<!--Layout for the navbar for the login and register pages-->
<nav class="navbar sticky-top navbar-expand-lg bg-light">
	<div class="container-fluid">
		<NavBrand />
		<NavCollapseToggler>
			<NavItemGroup>
				<NavItem href="home">Home</NavItem>
				<NavItem href="search">Search</NavItem>
			</NavItemGroup>
		</NavCollapseToggler>
	</div>
</nav>

<div class="p-3">
	<slot />
</div>
