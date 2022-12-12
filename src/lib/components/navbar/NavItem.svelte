<script lang="ts">
	import { page } from '$app/stores';

	/** The endpoint that the link will take the user to (without a '/')*/
	export let href: string;

	$: rootPath = $page.url.pathname.split('/')[1];
	$: active = rootPath === href ? 'active' : '';
</script>

<!--A navigation item that takes the user between pages-->
<li class="nav-item">
	<a class="nav-link {active}" aria-current="page" href="/{href}">
		<slot />
	</a>
</li>
