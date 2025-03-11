<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { reservations } = data;

	console.log(reservations);

	let isOpenNewReservation = $state(false);

	const openNewReservation = () => {
		isOpenNewReservation = true;
	};

	console.log(reservations);
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
		<!--
		<button onclick={openNewReservation} class="btn btn-neutral">Add New Customer</button>
		{#if isOpenNewReservation === true}
			<dialog class="modal z-10002">
				<div class="modal-box w-11/12 max-w-5xl">
					<h3 class="text-lg font-bold">Hello!</h3>
					<p class="py-4">Click the button below to close</p>
					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button, it will close the modal ->
							<button class="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		{/if}
        -->
	</div>

	<div class="bg-base-100 border-base-300 overflow-x-auto rounded-lg border-2 p-4">
		<table class="table">
			<!-- head -->
			<thead>
				<tr class=" text-neutral">
					<th><input type="checkbox" class="checkbox" /></th>
					<th>Guest</th>
					<th>Room</th>
					<th>Check-In</th>
					<th>Check-Out</th>
					<th>Duration</th>
					<th>Request</th>
					<th>Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each reservations as { guest_id, room_id, check_in, check_out, request, status }}
					<tr>
						<td><input type="checkbox" class="checkbox" /></td>
						<td class="flex flex-col">
							<div class="font-semibold">{guest_id.name}</div>
							<span class="font-semibold">{guest_id.cnic}</span>
						</td>
						<td><div class="font-semibold">{room_id.room_type} {room_id.room_number}</div></td>
						<td><div class="font-semibold">{check_in}</div></td>
						<td><div class="font-semibold">{check_out}</div></td>
						<td>{request}</td>
						<td>
							<div class="badge badge-success">
								{status}
							</div>
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
