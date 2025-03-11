<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let loading = $state(false);

	let passType = $state(false);

	const togglePassVisible = () => {
		passType = !passType;
	};
</script>

<div>
	<h2 class="mt-8 text-center text-2xl font-bold md:mt-12 lg:mt-16">Set New Password</h2>
	<form
		method="POST"
		action="?/restPassword"
		class="mt-6 md:mt-10"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<fieldset class="fieldset">
			<label class="input {form?.error === '' ? '' : ''} w-full focus:outline-0">
				<span class="icon-[ri--lock-password-line] text-base-content size-5"></span>
				<input
					class="grow focus:outline-0"
					placeholder="Password"
					name="password"
					type={passType === true ? 'text' : 'password'}
				/>
				<button
					onclick={togglePassVisible}
					class="btn btn-xs btn-ghost btn-circle"
					aria-label="Password"
					type="button"
				>
					<span
						class="{passType === true ? 'icon-[ri--eye-line]' : 'icon-[ri--eye-off-line]'} size-4"
					></span>
				</button>
			</label>
		</fieldset>

		{#if form?.success === true}
			<div role="alert" class="alert alert-success alert-soft !px-3 !py-1">
				<span>{form.message}</span>
			</div>
		{/if}
		{#if form?.error}
			<div role="alert" class="alert alert-error alert-soft !px-3 !py-1">
				<span>
					{form.error}
				</span>
			</div>
		{/if}
		<button
			class="btn btn-neutral btn-wide disabled:text-neutral mt-4 max-w-full gap-3 md:mt-6"
			type="submit"
			disabled={loading}
		>
			<span
				class="{loading === true
					? 'icon-[ri--loader-3-line] animate-spin'
					: 'icon-[ri--save-2-line]'} size-5"
			></span>{loading === true ? 'Updating...' : 'Update Password'}</button
		>
		<!--
		<a href="/auth/login" class="btn btn-wide text-neutral mt-4 max-w-full gap-3 md:mt-6">
			<span class="icon-[ri--login-circle-line] size-5"></span>Login</a
		>
        -->
	</form>
</div>
