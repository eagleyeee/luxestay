<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { customers } = data;

	console.log(customers);

	let isOpenCustomer = $state(false);

	const openNewCustomer = () => {
		isOpenCustomer = true;
	};

	//console.log(isOpenCustomer);
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row justify-between">
		<div class="join">
			<label class="join-item input-border input flex w-auto items-center gap-2">
				<span class="icon-[ri--search-line]"></span>
				<input type="text" class="grow" placeholder="Search" />
			</label>
			<button class="join-item btn btn-neutral">Search</button>
		</div>

		<button onclick={openNewCustomer} class="btn btn-neutral">Add New Customer</button>
		{#if isOpenCustomer === true}
			<dialog class="modal z-10002">
				<div class="modal-box w-11/12 max-w-5xl">
					<h3 class="text-lg font-bold">Hello!</h3>
					<p class="py-4">Click the button below to close</p>
					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button, it will close the modal -->
							<button class="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		{/if}
	</div>
	<div class="bg-base-100 border-base-300 overflow-x-auto rounded-lg border-2 p-4">
		<table class="table">
			<!-- head -->
			<thead>
				<tr class=" text-neutral">
					<th><input type="checkbox" class="checkbox" /></th>
					<th class="flex flex-col"
						><div>Name &</div>
						<span>CINC</span>
					</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Address</th>
				</tr>
			</thead>
			<tbody>
				{#each customers as { cnic, name, email, phone, address }}
					<tr>
						<td><div class="font-semibold">{cnic}</div></td>
						<td>
							<div class="font-semibold">{name}</div>
						</td>
						<td>
							<div class="font-semibold">{email}</div>
						</td>
						<td><div class="font-semibold">{phone}</div></td>
						<td>
							<div class="font-semibold">{address}</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
<!--
<tr>
						<td><div class="font-semibold">31404-4602421-0</div></td>
						<td>
							<div class="font-semibold">Hart</div>
						</td>
						<td>
							<div class="font-semibold">hart@gmail.com</div>
						</td>
						<td><div class="font-semibold">+923062581710</div></td>
						<td>
							<div class="font-semibold">Model Town A, Bahawalpur, Punjab 63100, Pakistan</div>
						</td>
					</tr>
-->
