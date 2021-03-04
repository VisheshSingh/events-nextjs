import React from 'react';
import EventLogistics from '../../components/events/EventLogistics';
import EventSummary from '../../components/events/EventSummary';
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventContent from '../../components/events/EventContent';
import ErrorAlert from '../../components/events/ErrorAlert';

const EventDetailsPage = () => {
  const router = useRouter();
  const eventId = router.query.eventid;
  const event = getEventById(eventId);

  if (!event) {
    return <ErrorAlert>No event found!</ErrorAlert>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </>
  );
};

export default EventDetailsPage;
