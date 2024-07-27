// pages/_app.js
import { Provider } from 'react-redux';
import {store} from '../Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
      <Component {...pageProps} />
      </PrimeReactProvider>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
