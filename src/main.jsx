import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GlobalStyles } from './styles/GlobalStyles.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
				<GlobalStyles />
				<App />
				<Toaster
					position="top-right"
					reverseOrder={true}
					getter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						suceess: { duration: 3000 },
						error: { duration: 4000 },
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							backgroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	</React.StrictMode>
);
