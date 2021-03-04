import React from 'react';
import Button from '../ui/button';
import styles from './EventFilterForm.module.css';

const EventFilterForm = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const filterEvents = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={filterEvents}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year'>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor='month'>Month</label>
          <select id='month'>
            {months.map((month, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button>Filter events</Button>
    </form>
  );
};

export default EventFilterForm;
