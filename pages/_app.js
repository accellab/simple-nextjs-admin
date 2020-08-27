import '../styles/globals.css';
import '../styles/layout/layout.scss';

// Components
import Head from 'next/head';
import MainLayout from '../layout/MainLayout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Alata&family=Lato:wght@300;400;700&display=swap'
          rel='stylesheet'
        />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <div id='modal-root'></div>
    </>
  );
}

export default MyApp;
