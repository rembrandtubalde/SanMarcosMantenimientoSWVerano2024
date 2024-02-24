/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    >
      <App />
    </GoogleOAuthProvider>
  </Provider>
);