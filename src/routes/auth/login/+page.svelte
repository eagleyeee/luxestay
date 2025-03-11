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
	<h2 class="mt-8 text-center text-2xl font-bold md:mt-12 lg:mt-16">Sign In</h2>
	<h4 class="text-base-content text-md mt-2 text-center">Where Value Meets Elegance</h4>
	<form
		method="POST"
		action="?/login"
		class="mt-6 md:mt-10"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<!--? form?.message : ''
			
			: form?.error === 'Invalid login credentials'
							? 'input-error'
							: form?.error === 'Email and password are required' ? ''} w-full focus:outline-0"
			

							form?.error === 'Password are required' ? '' : ''
			-->
		<fieldset class="fieldset">
			<label class="input {form?.error === '' ? '' : ''} w-full focus:outline-0">
				<span class="icon-[ri--at-line] text-base-content size-5"></span>
				<input class="grow focus:outline-0" placeholder="Email Address" name="email" type="email" />
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<!--
				form?.error === 'Email and password are required' ||
					form?.error === 'Invalid login credentials'
					-->
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
		<div class="text-end">
			<a class="label-text text-base-content text-xs font-semibold" href="/auth/forgot-password"
				>Forgot Password?</a
			>
		</div>
		<button
			class="btn btn-neutral btn-wide disabled:text-neutral mt-4 max-w-full gap-3 md:mt-6"
			type="submit"
			disabled={loading}
		>
			<span
				class="{loading === true
					? 'icon-[ri--loader-3-line] animate-spin'
					: 'icon-[ri--login-circle-line]'} size-5"
			></span>{loading === true ? 'Logging In...' : 'Login'}</button
		>
	</form>
</div>
