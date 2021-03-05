import React from 'react';
import { getAllEvents } from '../../utils/api-utils';
import EventList from '../../components/events/EventList';
import { useRouter } from 'next/router';
import EventFilterForm from '../../components/events/EventFilterForm';
import Head from 'next/head';

const AllEventsPage = (props) => {
  const router = useRouter();

  const filterHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a bunch of events to evolve...'
        />
      </Head>
      <EventFilterForm onSearch={filterHandler} />
      <EventList items={props.events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
}
export default AllEventsPage;
