import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../services/apiBookings';
import { useNavigate } from 'react-router-dom';

export const useUpdatingCheckin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: updateCheckinMutate, isPending: isCheckinUpdating } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} succesfully checked in.`);
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
			navigate('/');
		},
		onError: (err) => toast.error('There was an error while checking in: ' + err.message),
	});

	return { updateCheckinMutate, isCheckinUpdating };
};
