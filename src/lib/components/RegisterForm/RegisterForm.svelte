<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		useForm,
		Hint,
		HintGroup,
		validators,
		minLength,
		required,
		pattern
	} from 'svelte-use-form';
	import { matchInput } from '$lib/forms/FormValidators';

	const form = useForm();

	const requiredMessage = 'This field is required.';
</script>

<div>
	<h1>Register</h1>
	<form method="POST" use:form use:enhance action="/register">
		<div class="form-group">
			<label for="username">Username</label>
			<input
				class="form-control"
				id="username"
				name="username"
				type="text"
				use:validators={[required, pattern(/^[a-zA-Z0-9_-]*$/)]}
			/>
			<HintGroup for="username">
				<Hint on="required">{requiredMessage}</Hint>
				<Hint on="minLength" hideWhenRequired let:value>
					Username requires at least {value} characters.
				</Hint>
				<Hint on="pattern" hideWhenRequired>
					Illegal character used. Valid characters are: a-z A-Z 0-9 - _
				</Hint>
			</HintGroup>
			<br />

			<label for="password">Password</label>
			<input
				class="form-control"
				id="password"
				name="password"
				type="password"
				use:validators={[required, minLength(5)]}
			/>
			<HintGroup for="password">
				<Hint on="required">{requiredMessage}</Hint>
				<Hint on="minLength" hideWhenRequired let:value>
					This field must have at least {value} characters.
				</Hint>
			</HintGroup>
			<br />

			<label for="verifyPassword">Verify Password</label>
			<input
				class="form-control"
				id="verifyPassword"
				name="verifyPassword"
				type="password"
				use:validators={[required, matchInput('password')]}
			/>
			<HintGroup for="verifyPassword">
				<Hint on="required">{requiredMessage}</Hint>
				<Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
			</HintGroup>
			<br />
		</div>

		<div class="text-center">
			<button class="btn btn-primary " disabled={!$form.valid} type="submit">Register </button>
		</div>
	</form>
</div>

<style lang="scss">
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
