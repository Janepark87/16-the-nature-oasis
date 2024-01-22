import { useCabinQuery } from '../../hooks/useCabin';
import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from '../../hooks/useDashboard';
import Spinner from '../../components/Spinner';
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardContent = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardContent() {
	const { bookings, isBookingsLoading } = useRecentBookings();
	const { confirmedStays, numDays, isStaysLoading } = useRecentStays();
	const { cabins, isCabinsLoading } = useCabinQuery();

	if (isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

	return (
		<StyledDashboardContent>
			<Statistics bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} totalCabins={cabins.length} />
			<div>test1</div>
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardContent>
	);
}
