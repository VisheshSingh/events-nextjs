import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';
import NotificationState from '../context/Notification/NotificationState';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationState>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS events' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationState>
  );
}

export default MyApp;
