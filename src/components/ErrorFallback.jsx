import styled from 'styled-components';
import Heading from './Heading';
import Button from './Button';

const StyledErrorFallback = styled.main`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 0 1 96rem;
	padding: 4.8rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		font-family: 'Sono';
		margin-bottom: 3.2rem;
		color: var(--color-grey-500);
	}
`;

export default function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<StyledErrorFallback>
			<Box>
				<Heading as="h1">Something went wrong 🧐</Heading>
				{import.meta.env.DEV && <p>{error.message}</p>}
				<Button size="lg" onClick={resetErrorBoundary}>
					Try again
				</Button>
			</Box>
		</StyledErrorFallback>
	);
}
