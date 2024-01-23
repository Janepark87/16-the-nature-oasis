import { useState } from 'react';
import { useUpdateUser, useUser } from '../../hooks/useAuth';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

export default function UpdateUserDataForm() {
	const {
		user: {
			email,
			user_metadata: { fullname: currentFullname, avatar: currentAvatar },
		},
	} = useUser();
	const [fullname, setFullname] = useState(currentFullname || 'Unknown');
	const [avatar, setAvatar] = useState(currentAvatar || 'default-user.jpg');
	const [errorName, setErrorName] = useState('');
	const { updateUserMutate, isUserUpdating } = useUpdateUser();
	const previewAvatar =
		avatar === 'default-user.jpg' ? avatar : !avatar || avatar === currentAvatar ? currentAvatar ?? 'default-user.jpg' : URL.createObjectURL(avatar);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate name or avatar before submitting
		const trimmedFullname = fullname.trim();
		if (!trimmedFullname || trimmedFullname === 'Unknown') return setErrorName('Please update your full name.');

		// this checks for unchanged values and a null avatar
		if (trimmedFullname === currentFullname && (!avatar || avatar === currentAvatar || avatar === 'default-user.jpg'))
			return toast.error('There are no changes. Please update your name or avatar.');

		updateUserMutate(
			{ fullname: trimmedFullname, avatar: avatar === 'default-user.jpg' ? null : avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					setErrorName('');
					e.target.reset(); // clear the file input value
				},
			}
		);
	};

	const handleReset = () => {
		setFullname(currentFullname);
		setAvatar(currentAvatar || 'default-user.jpg');
		setErrorName('');
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>

			<FormRow label="Username" error={errorName}>
				<Input
					id="fullname"
					type="text"
					defaultValue={fullname ? fullname : 'Unknown'}
					onChange={(e) => {
						setFullname(e.target.value);
						setErrorName('');
					}}
					disabled={isUserUpdating}
				/>
			</FormRow>

			<FormRow label="Avatar image" updateValues={{ image: previewAvatar, name: `Avatar of ${fullname}` }} previewLoading={isUserUpdating}>
				<FileInput id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} disabled={isUserUpdating} />
			</FormRow>

			<FormRow>
				<Button type="reset" variation="secondary" disabled={isUserUpdating} onClick={handleReset}>
					Reset
				</Button>
				<Button disabled={isUserUpdating}>Update account</Button>
			</FormRow>
		</Form>
	);
}
