import EventFilterForm from '../components/events/EventFilterForm';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../utils/api-utils';
import { useRouter } from 'next/router';

export default function Home(props) {
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
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}
