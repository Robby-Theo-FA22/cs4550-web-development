<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Register</h1>
	<form method="POST" use:enhance action="/register">
		<input class="form-control" name="username" type="text" placeholder="Username" />
		<input class="form-control" name="password" type="password" placeholder="Password" />
		<input
			class="form-control"
			name="verifyPassword"
			type="password"
			placeholder="Verify Password"
		/>
		<button class="btn btn-primary" type="submit">Register</button>
	</form>
</div>
