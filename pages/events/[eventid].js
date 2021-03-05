import React from 'react';
import EventLogistics from '../../components/events/EventLogistics';
import EventSummary from '../../components/events/EventSummary';
import { getEventById, getAllEvents } from '../../utils/api-utils';
import EventContent from '../../components/events/EventContent';
import ErrorAlert from '../../components/events/ErrorAlert';

const EventDetailsPage = (props) => {
  const event = props.selectedEvent;

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

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      selectedEvent,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths,
    fallback: false,
  };
}
export default EventDetailsPage;
