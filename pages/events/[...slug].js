import React, { useState, useEffect } from 'react';
import EventList from '../../components/events/EventList';
import { useRouter } from 'next/router';
// import { getFilteredEvents } from '../../utils/api-utils';
import ResultsTitle from '../../components/events/ResultsTitle';
import ErrorAlert from '../../components/events/ErrorAlert';
import Button from '../../components/ui/button';
import useSWR from 'swr';

const FilteredEventsPage = (props) => {
  const [loadedEvents, setLoadedEvents] = useState([]);

  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className={'center'}>Loading...</p>;
  }

  const { data, error } = useSWR(
    `https://nextjs-84b5a-default-rtdb.firebaseio.com/events.json`
  );

  useEffect(() => {
    if (data) {
      let events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  const [year, month] = filteredData;

  if (
    isNaN(+year) ||
    isNaN(+month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month > 12 ||
    +month < 1 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>Invalid filter. Please adjust your inputs.</ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(+year, +month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

/* export async function getServerSideProps(context) {
  const { params } = context;
  const [year, month] = params.slug;

  if (
    isNaN(+year) ||
    isNaN(+month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month > 12 ||
    +month < 1
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const dateFilter = { year: +year, month: +month };
  const filteredEvents = await getFilteredEvents(dateFilter);

  return {
    props: {
      events: filteredEvents,
      date: {
        year: +year,
        month: +month,
      },
    },
  };
} */

export default FilteredEventsPage;
