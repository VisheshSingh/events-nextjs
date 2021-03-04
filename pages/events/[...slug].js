import React from 'react';
import EventList from '../../components/events/EventList';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import ResultsTitle from '../../components/events/ResultsTitle';
import ErrorAlert from '../../components/events/ErrorAlert';
import Button from '../../components/ui/button';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className={'center'}>Loading...</p>;
  }

  const [year, month] = filteredData;
  const dateFilter = { year: +year, month: +month };
  const events = getFilteredEvents(dateFilter);

  if (
    isNaN(+year) ||
    isNaN(+month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month > 12 ||
    +month < 1
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

  if (!events || events.length === 0) {
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
      <EventList items={events} />
    </>
  );
};

export default FilteredEventsPage;
