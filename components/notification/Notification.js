import { useContext, useEffect } from 'react';

import classes from './notification.module.css';
import notificationContext from '../../context/Notification/notificationContext';

function Notification(props) {
  const notificationCtx = useContext(notificationContext);
  const { notification, hideNotification } = notificationCtx;

  useEffect(() => {
    if (
      notification &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
