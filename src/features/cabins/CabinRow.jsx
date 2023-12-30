import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useCreateUpdateCabin, useDeleteCabin } from '../../hooks/useCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	font-size: 10px;
	/* transform: scale(1.66666) translateX(-2px); */
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;
	const { deleteCabinMutate, isCabinDeleting } = useDeleteCabin();
	const { careateUpdateCabinMutate, isCabinCreatingUpdating } = useCreateUpdateCabin();

	const duplicateCabin = () => {
		const copyCabin = {
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			image,
		};

		careateUpdateCabinMutate({ cabinData: copyCabin });
	};

	return (
		<TableRow role="row">
			<Img src={image} alt={name} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

			<div>
				<button>
					<HiSquare2Stack onClick={duplicateCabin} disabled={isCabinCreatingUpdating} />
				</button>

				<Modal>
					<Modal.OpenTrigger type="cabin-form-edit">
						<button>
							<HiPencil />
						</button>
					</Modal.OpenTrigger>
					<Modal.Window type="cabin-form-edit">
						<CreateCabinForm updateCabin={cabin} />
					</Modal.Window>

					<Modal.OpenTrigger type="cabin-delete-confirmation">
						<button>
							<HiTrash />
						</button>
					</Modal.OpenTrigger>
					<Modal.Window type="cabin-delete-confirmation">
						<ConfirmDelete resource="Cabin" disabled={isCabinDeleting} onConfirm={() => deleteCabinMutate(cabinId)} />
					</Modal.Window>
				</Modal>
			</div>
		</TableRow>
	);
}
