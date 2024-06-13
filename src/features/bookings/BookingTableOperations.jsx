import { TableOperations, Filter, SortBy } from '../../components';

export default function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'checked-in', label: 'Checked in' },
					{ value: 'checked-out', label: 'Checked out' },
					{ value: 'unconfirmed', label: 'Unconfirmed' },
				]}
			/>

			<SortBy
				options={[
					{ value: 'totalPrice-asc', label: 'Amount (low first)' },
					{ value: 'totalPrice-desc', label: 'Amount (high first)' },
					{ value: 'startDate-asc', label: 'Date (earlier first)' },
					{ value: 'startDate-desc', label: 'Date (recent first)' },
				]}
			/>
		</TableOperations>
	);
}
