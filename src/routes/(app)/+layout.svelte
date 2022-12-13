<script lang="ts">
	import NavCollapseToggler from '$lib/components/Navbar/NavCollapseToggler.svelte';
	import NavBrand from '$lib/components/Navbar/NavBrand.svelte';
	import NavItem from '$lib/components/Navbar/NavItem.svelte';
	import NavLoginRegister from '$lib/components/navbar/NavLoginRegister.svelte';
	import NavItemGroup from '$lib/components/Navbar/NavItemGroup.svelte';
	import NavWelcomeLogout from '$lib/components/navbar/NavWelcomeLogout.svelte';

	import { page } from '$app/stores';

	$: currentUser = $page.data.currentUser;
</script>

<!--Layout for the navbar in most of the application-->
<nav class="navbar sticky-top navbar-expand-lg bg-light">
	<div class="container-fluid">
		<NavBrand />
		<NavCollapseToggler>
			<NavItemGroup>
				<NavItem href="home">Home</NavItem>
				<NavItem href="search">Search</NavItem>
				<NavItem href="profile">Profile</NavItem>
			</NavItemGroup>
			<div class="d-flex">
				{#if currentUser}
					<NavWelcomeLogout username={currentUser} />
				{:else}
					<NavLoginRegister />
				{/if}
			</div>
		</NavCollapseToggler>
	</div>
</nav>

<div class="p-3">
	<slot />
</div>
