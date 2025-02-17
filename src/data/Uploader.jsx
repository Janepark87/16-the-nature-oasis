import { useState } from 'react';
import supabase from '../services/supabase';
import styled from 'styled-components';
import { isFuture, isPast, isToday } from 'date-fns';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';
import { subtractDates } from '../utils/helpers';
import { Button, Heading } from '../components';

const StylesUploader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 8px;
	margin-top: 1rem;
	background-color: var(--color-indigo-100);
	border-radius: var(--border-radius-sm);
	text-align: center;
`;

async function deleteGuests() {
	const { error } = await supabase.from('guests').delete().gt('id', 0);
	if (error) console.log(error.message);
}

async function deleteCabins() {
	const { error } = await supabase.from('cabins').delete().gt('id', 0);
	if (error) console.log(error.message);
}

async function deleteBookings() {
	const { error } = await supabase.from('bookings').delete().gt('id', 0);
	if (error) console.log(error.message);
}

async function createGuests() {
	const { error } = await supabase.from('guests').insert(guests);
	if (error) console.log(error.message);
}

async function createCabins() {
	const { error } = await supabase.from('cabins').insert(cabins);
	if (error) console.log(error.message);
}

async function createBookings() {
	// Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
	const { data: guestsIds } = await supabase.from('guests').select('id').order('id');
	const allGuestIds = guestsIds.map((guest) => guest.id);

	const { data: cabinsIds } = await supabase.from('cabins').select('id').order('id');
	const allCabinIds = cabinsIds.map((cabin) => cabin.id);

	const finalBookings = bookings.map((booking) => {
		// If the IDs in the bookings array start from 1, subtracting 1 from booking.cabinId adjusts it to the zero-based index used by arrays.
		const cabin = cabins.at(booking.cabinId - 1);
		const numNights = subtractDates(booking.endDate, booking.startDate);
		const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
		const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0; // hardcoded breakfast price
		const totalPrice = cabinPrice + extrasPrice;

		let status;
		if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) status = 'checked-out';
		if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) status = 'unconfirmed';
		if ((isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) && isPast(new Date(booking.startDate)) && !isToday(new Date(booking.startDate))) status = 'checked-in';

		return {
			...booking,
			numNights,
			cabinPrice,
			extrasPrice,
			totalPrice,
			guestId: allGuestIds.at(booking.guestId - 1),
			cabinId: allCabinIds.at(booking.cabinId - 1),
			status,
		};
	});

	const { error } = await supabase.from('bookings').insert(finalBookings);
	if (error) console.log(error.message);
}

export function Uploader() {
	const [isLoading, setIsLoading] = useState(false);

	async function uploadAll() {
		setIsLoading(true);
		// Bookings need to be deleted FIRST
		await deleteBookings();
		await deleteGuests();
		await deleteCabins();

		// Bookings need to be created LAST
		await createGuests();
		await createCabins();
		await createBookings();

		setIsLoading(false);
	}

	async function uploadBookings() {
		setIsLoading(true);
		await deleteBookings();
		await createBookings();
		setIsLoading(false);
	}

	return (
		<StylesUploader>
			<Heading as="h4">Dev Area</Heading>

			{/* Only run this only once! Cabin images need to be uploaded manually */}
			<Button onClick={uploadAll} disabled={isLoading} $width="w-full">
				Upload ALL
			</Button>

			{/* You can run this every day you develop the app */}
			<Button onClick={uploadBookings} disabled={isLoading} $width="w-full">
				Upload CURRENT bookings
			</Button>
		</StylesUploader>
	);
}
