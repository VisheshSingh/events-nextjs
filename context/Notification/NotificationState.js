import React, { useReducer } from 'react';
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../types';
import NotificationContext from './notificationContext';
import notificationReducer from './notificationReducer';

const NotificationState = (props) => {
  const initState = {
    notification: null,
  };

  const [state, dispatch] = useReducer(notificationReducer, initState);

  // show notification
  const showNotification = (notification) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: notification,
    });
  };

  // hide notification
  const hideNotification = () => {
    dispatch({
      type: HIDE_NOTIFICATION,
      payload: null,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, showNotification, hideNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationState;
