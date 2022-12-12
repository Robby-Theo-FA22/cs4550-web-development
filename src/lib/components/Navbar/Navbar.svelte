<script lang="ts">
	import NavCollapseToggler from '$lib/components/Navbar/NavCollapseToggler.svelte';
	import NavBrand from '$lib/components/Navbar/NavBrand.svelte';
	import NavbarNav from '$lib/components/Navbar/NavItemGroup.svelte';
	import NavItem from '$lib/components/Navbar/NavItem.svelte';
	import NavLogin from '$lib/components/Navbar/NavLogin.svelte';
</script>

<nav class="navbar navbar-expand-lg bg-light">
	<div class="container-fluid">
		<NavBrand />
		<NavCollapseToggler>
			<NavbarNav>
				<NavItem href="home">Home</NavItem>
				<NavItem href="search">Search</NavItem>
			</NavbarNav>
			<div class="d-flex">
				<NavLogin />
			</div>
		</NavCollapseToggler>
	</div>
</nav>
