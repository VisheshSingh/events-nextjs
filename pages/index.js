import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../utils/api-utils';

export default function Home(props) {
  return (
    <>
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
