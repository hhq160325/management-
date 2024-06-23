import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ConfirmProvider } from 'material-ui-confirm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="298458591622-2elmpddr4h3fhji6urt5gj6r2luv874m.apps.googleusercontent.com">
			<BrowserRouter>
				<ConfirmProvider>
					<App />
				</ConfirmProvider>
			</BrowserRouter>
		</GoogleOAuthProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
