import styled from 'styled-components';
import { Media } from '../../../styles/Breakpoints';

export const StyledDataContainer = styled.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	overflow: hidden;
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 3rem;
	color: #e0e7ff;
	background-color: var(--color-brand-500);
	font-size: 1.8rem;
	font-weight: 500;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& > div:first-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-size: 1.8rem;
		font-weight: 600;
	}

	& p span {
		margin-left: 4px;
		font-family: 'Sono';
		font-size: 2rem;
	}

	${Media.lg`
		padding: 1.75rem 2rem;
		font-size: 1.6rem;

		svg {
			height: 2.5rem;
			width: 2.5rem;
		}	

		& > div:first-child {
			font-size: 1.6rem;
		}

	`}
`;

export const DataContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	padding: 3.2rem 3.5rem;
`;

export const Guest = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
	color: var(--color-grey-500);

	${Media.lg`
		&, & > div:first-of-type{
			align-items: baseline;
		}
	`}

	& > div:first-of-type {
		display: flex;
		gap: 1.2rem;
		color: var(--color-grey-700);
		font-weight: 500;

		${Media.lg`
			p > span{
				display: block;
			}
		`}
	}
	& > div:nth-of-type(2) {
		display: flex;
		gap: 1.2rem;

		${Media.lg`
			flex-direction: column;
			align-items: flex-end;
			gap: 0;

			> span{
				display: none;
			}
		`}
	}
`;

export const Price = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1.6rem;
	padding: 2rem 2.5rem;
	margin-top: 1.5rem;
	border-radius: var(--border-radius-sm);
	color: ${(props) => (props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)')};
	background-color: ${(props) => (props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)')};

	& > div:first-child {
		align-items: center;

		p {
			text-align: left;
			line-height: 1;
		}

		${Media.lg`
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start !important;
			gap: .5rem;
		`}
	}

	& p:last-child {
		text-align: right;
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.2rem;
		width: 2.2rem;
		color: currentColor !important;
	}
`;

export const Footer = styled.footer`
	padding: 1.6rem 4rem;
	color: var(--color-grey-500);
	text-align: right;
	font-size: 1.2rem;
`;
