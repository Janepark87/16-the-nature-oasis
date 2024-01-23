import { useSearchParams } from 'react-router-dom';
import { useCabinQuery } from '../../hooks/useCabin';
import EllipsisDropdown from '../../components/EllipsisDropdown';
import Table from '../../components/Table';
import CabinRow from './CabinRow';
import AddCabin from './AddCabin';
import Spinner from '../../components/Spinner';

export default function CabinTable() {
	const { cabins, isCabinsLoading } = useCabinQuery();
	const [searchParams] = useSearchParams();

	if (isCabinsLoading) return <Spinner />;

	// filter by discount
	const filterDiscount = searchParams.get('discount') || 'all';
	const filteredDiscount =
		filterDiscount === 'all'
			? cabins
			: filterDiscount === 'no-discount'
			? cabins.filter((cabin) => cabin.discount === 0)
			: cabins.filter((cabin) => cabin.discount > 0);

	// sort by
	const sortBy = searchParams.get('sortBy') || 'name-asc';
	const [field, direction] = sortBy.split('-');
	const modifire = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredDiscount.sort((a, b) => {
		if (field === 'name') {
			return a.name.localeCompare(b.name) * modifire;
		} else if (field === 'created_at') {
			const dateA = new Date(a.created_at);
			const dateB = new Date(b.created_at);
			return (dateA - dateB) * modifire;
		} else {
			return (a[field] - b[field]) * modifire;
		}
	});

	return (
		<EllipsisDropdown>
			<Table columns=".8fr 1.8fr 1.5fr 1.5fr 1.5fr 1fr">
				<Table.Header>
					<span>Image</span>
					<span>Cabin</span>
					<span>Capacity</span>
					<span>Price</span>
					<span>Discount</span>
					<span></span>
				</Table.Header>

				<Table.Body data={sortedCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
			</Table>

			<AddCabin />
		</EllipsisDropdown>
	);
}
