// pages/_app.js
import { Provider } from 'react-redux';
import {store} from '../Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
       <title>Infinity Travel</title>
      <link rel="icon" href="/images/logo.png" type="image/x-icon"/>
      </Head>
      <PrimeReactProvider>
      <Component {...pageProps} />
      </PrimeReactProvider>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
