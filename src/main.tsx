import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StoreContextProvider } from './state/state';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<StoreContextProvider>
			<App />
		</StoreContextProvider>
	</React.StrictMode>
);
