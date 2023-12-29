import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
	z-index: 1001;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
	cursor: pointer;
`;

const Button = styled.button`
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;
	padding: 0.4rem;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

// Modal Provider
export default function Modal({ children }) {
	const [typeName, setTypeName] = useState('');

	const closeModal = () => setTypeName('');
	const openModal = (type) => setTypeName(type);

	return <ModalContext.Provider value={{ typeName, closeModal, openModal }}>{children}</ModalContext.Provider>;
}

// useModal custom hook
const useModal = () => useContext(ModalContext);

function OpenTrigger({ children, type }) {
	const { openModal } = useModal();

	return cloneElement(children, {
		onClick: (e) => {
			openModal(type);
			e.stopPropagation();
		},
	});
}

function Window({ children, type, customEvent = false }) {
	const { typeName, closeModal } = useModal();

	if (type !== typeName) return null;

	return createPortal(
		<Overlay>
			<StyledModal>
				<Button onClick={closeModal}>
					<HiXMark />
				</Button>

				<div>{!customEvent ? children : cloneElement(children, { onCloseModal: () => closeModal() })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.OpenTrigger = OpenTrigger;
Modal.Window = Window;
