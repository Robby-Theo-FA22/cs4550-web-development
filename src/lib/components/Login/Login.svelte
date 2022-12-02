<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Log In</h1>
	<form method="POST" use:enhance action="/login">
		<input class="form-control" name="username" type="text" placeholder="Username" />
		<input class="form-control" name="password" type="password" placeholder="Password" />
		<button class="btn btn-primary" type="submit">Log In</button>
	</form>
</div>
