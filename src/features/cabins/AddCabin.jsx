import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
	return (
		<Modal>
			<Modal.OpenTrigger type="cabin-form">
				<Button>Add new cabin</Button>
			</Modal.OpenTrigger>
			<Modal.Window type="cabin-form" customEvent={true}>
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}
