import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft } from 'react-icons/hi2';
import { useBooking, useDeleteBooking } from '../../hooks/useBooking';
import { useUpdatingCheckout } from '../../hooks/useCheckBooking';
import { useGoback } from '../../hooks/useGoback';
import Row from '../../components/Row';
import Heading from '../../components/Heading';
import Spinner from '../../components/Spinner';
import Badge from '../../components/Badge';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import BookingDetailDataBlock from './BookingDetailDataBlock';
import ConfirmDelete from '../../components/ConfirmDelete';

const HeadingGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 2.4rem;
`;

export default function BookingDetail() {
	const navigate = useNavigate();
	const { booking, isBookingLoading } = useBooking();
	const { id: bookingId, status } = booking;
	const { updateCheckoutMutate, isCheckoutUpdating } = useUpdatingCheckout();
	const { deleteBookingMutate, isBookingDeleting } = useDeleteBooking();
	const goback = useGoback();

	const statusBadgeType = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	if (isBookingLoading) return <Spinner />;
	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Badge type={statusBadgeType[status]}>{status.replace('-', ' ')}</Badge>
				</HeadingGroup>
				<Button variation="ghost" onClick={goback}>
					<HiArrowLeft /> Back
				</Button>
			</Row>

			<BookingDetailDataBlock booking={booking} />

			<ButtonGroup>
				<Modal>
					<Modal.Trigger type="booking-detail-delete-confirmation">
						<Button variation="danger">Delete Booking</Button>
					</Modal.Trigger>

					<Modal.Window type="booking-detail-delete-confirmation">
						<ConfirmDelete
							resource={`Booking #${bookingId}`}
							disabled={isBookingDeleting}
							onConfirm={() =>
								deleteBookingMutate(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				{status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

				{status === 'checked-in' && (
					<Button onClick={() => updateCheckoutMutate(bookingId)} disabled={isCheckoutUpdating}>
						Check out
					</Button>
				)}

				<Button variation="secondary" onClick={goback}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}
