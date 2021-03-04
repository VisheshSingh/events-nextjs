import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';
import styles from '../styles/Home.module.css';

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return <EventList items={featuredEvents} />;
}
