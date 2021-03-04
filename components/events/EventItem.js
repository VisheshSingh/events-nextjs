import React from 'react';
import styles from './EventItem.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Button from '../ui/button';

const EventItem = (props) => {
  const { id, title, date, location, image } = props;
  const humanReadableDate = new Date(date).toLocaleString({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const address = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt={`${title}`} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
