<script lang="ts">
	import { enhance } from '$app/forms';
	import { useForm } from 'svelte-use-form';

	const form = useForm();

	export let username: string;
</script>

<!--Welcomes a user to the application and lets them logout-->
<span class="navbar-text me-2">Welcome, {username}</span>
<form method="POST" use:form use:enhance action="/api/logout">
	<button class="btn btn-outline-danger" type="submit">Log Out</button>
</form>
