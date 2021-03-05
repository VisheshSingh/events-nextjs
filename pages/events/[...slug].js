import React from 'react';
import EventList from '../../components/events/EventList';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../utils/api-utils';
import ResultsTitle from '../../components/events/ResultsTitle';
import ErrorAlert from '../../components/events/ErrorAlert';
import Button from '../../components/ui/button';

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className={'center'}>Loading...</p>;
  }

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>Invalid filter. Please adjust your inputs.</ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse all events</Button>
        </div>
      </>
    );
  }

  if (!props.events || props.events.length === 0) {
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

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </>
  );
};

export async function getServerSideProps(context) {
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
}

export default FilteredEventsPage;
