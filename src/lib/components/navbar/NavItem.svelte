<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	$: rootPath = $page.url.pathname.split('/')[1];
	$: active = rootPath === href ? 'active' : '';
</script>

<li class="nav-item">
	<a class="nav-link {active}" aria-current="page" href="/{href}">
		<slot />
	</a>
</li>
