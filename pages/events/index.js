import React from 'react';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';

const AllEventsPage = () => {
  const events = getAllEvents();

  return <EventList items={events} />;
};

export default AllEventsPage;
