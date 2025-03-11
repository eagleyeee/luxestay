<script lang="ts">
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	import { supabase } from '$lib/supabase/client';

	interface Room {
		id: string;
		room_number: string;
		room_type: string;
		price_per_night: number;
		status: string;
	}

	let { data } = $props();
	const { rooms } = data;

	let initRooms: Room[] = $state([...rooms]);
	const roomsStore = writable<Room[]>(initRooms);

	//$effect(() => {
	const roomsChannel = supabase
		.channel('realtime-rooms')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
			console.log('Change received!', payload);
			roomsStore.update((rms: Room[]) => {
				if (!payload.new) return rms;
				return [...rms, payload.new as Room];
			});
		})
		.subscribe();
	/*
		return () => {
			supabase.removeChannel(roomsChannel);
		};
		*/
	//});

	onDestroy(() => {
		supabase.removeChannel(roomsChannel);
	});

	let isOpenNewRoom = $state(false);

	const openNewRoom = () => {
		isOpenNewRoom = true;
	};

	const closeNewRoom = () => {
		isOpenNewRoom = false;
	};
</script>

<div
	class="bg-base-100 border-base-300 flex flex-col gap-5 overflow-x-auto rounded-lg border-2 p-4"
>
	<div class="flex flex-row justify-between gap-4">
		<div class="input input-neutral rounded-box flex w-full items-center gap-2">
			<span class="icon-[ri--search-line] text-base-content size-5"></span>
			<input type="text" class="grow" placeholder="Search" />
		</div>
		<div class="gap flex flex-row gap-2">
			<button
				onclick={openNewRoom}
				class="btn btn-ghost btn-square text-neutral"
				aria-label="Add Room"
			>
				<span class="icon-[ri--add-circle-line] size-6"></span>
			</button>
			<button
				onclick={openNewRoom}
				class="btn btn-ghost btn-square text-neutral"
				aria-label="Add Room"
			>
				<span class="icon-[ri--file-download-line] size-6"></span>
			</button>
		</div>
	</div>
	<table class="table">
		<!-- head -->
		<thead>
			<tr class=" text-neutral">
				<th><input type="checkbox" class="checkbox checkbox-neutral" /></th>
				<th>Room</th>
				<!--<th>Room Type</th>-->
				<th>Price (Per Night)</th>
				<th>Status</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each $roomsStore as { room_number, room_type, price_per_night, status }}
				<tr>
					<td><input type="checkbox" class="checkbox" /></td>
					<td><div class="font-semibold">{room_number} {room_type}</div></td>
					<!--<td><div class="font-semibold">{room_type}</div></td>-->
					<td><div class="font-semibold">{price_per_night} Rs.</div></td>
					<td>
						<div
							class="badge !px-[5px] font-semibold {status === 'Occupied'
								? 'badge-warning'
								: status === 'Available'
									? 'badge-success'
									: ''}"
						>
							{status}
						</div>
					</td>
					<td>
						<div class="flex flex-row gap-1">
							<!--onclick={updateRoom()}-->
							<button class="btn btn-ghost btn-sm btn-square text-neutral" aria-label="Edit Room">
								<span class="icon-[ri--eye-line] size-[18px]"></span>
							</button>
							<button class="btn btn-ghost btn-sm btn-square text-neutral" aria-label="Edit Room">
								<span class="icon-[ri--edit-line] size-[18px]"></span>
							</button>
							<button class="btn btn-ghost btn-sm btn-square text-neutral" aria-label="Delete Room">
								<span class="icon-[ri--delete-bin-line] size-[18px]"></span>
							</button>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if isOpenNewRoom === true}
	<dialog class="modal modal-open modal-bottom sm:modal-middle z-1004">
		<div class="modal-box">
			<button
				onclick={closeNewRoom}
				class="btn btn-sm btn-square btn-ghost absolute top-2 right-2"
				aria-label="close-modal"
			>
				<span class="icon-[ri--close-circle-line] size-6"></span>
			</button>
			<h1 class="text-2xl font-bold">Add Room</h1>
			<form method="POST" action="?/add" use:enhance>
				<input
					type="text"
					name="room_number"
					placeholder="Room Number"
					class="input input-neutral"
				/>
				<input type="text" name="room_type" placeholder="Room Type" class="input input-neutral" />
				<input
					type="number"
					name="price_per_night"
					placeholder="Price per Night"
					class="input input-neutral"
				/>
				<input type="text" name="status" placeholder="Status" class="input input-neutral" />
				<button type="submit" class="btn btn-neutral" aria-label="Add Room">Add Room</button>
			</form>
			<p class="py-4">Press ESC key or click the button below to close</p>
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn">Close</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
