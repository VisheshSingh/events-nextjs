import React from 'react';
import { getAllEvents } from '../../utils/api-utils';
import EventList from '../../components/events/EventList';
import { useRouter } from 'next/router';
import EventFilterForm from '../../components/events/EventFilterForm';

const AllEventsPage = (props) => {
  const router = useRouter();

  const filterHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
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
