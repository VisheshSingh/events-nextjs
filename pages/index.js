import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../utils/api-utils';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/NewsLetterRegistration';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a bunch of events to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
