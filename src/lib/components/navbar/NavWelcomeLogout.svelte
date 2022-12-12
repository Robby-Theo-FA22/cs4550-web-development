<script lang="ts">
	import { enhance } from '$app/forms';
	import { useForm } from 'svelte-use-form';

	const form = useForm();

	export let username: string;
</script>

<span class="navbar-text me-2">Welcome, {username}</span>
<form method="POST" use:form use:enhance action="/api/logout">
	<button class="btn btn-outline-danger" submit>Log Out</button>
</form>
