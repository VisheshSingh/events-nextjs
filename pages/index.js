import EventFilterForm from '../components/events/EventFilterForm';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const featuredEvents = getFeaturedEvents();

  const filterHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventFilterForm onSearch={filterHandler} />
      <EventList items={featuredEvents} />
    </>
  );
}
