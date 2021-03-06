import React, { useContext } from 'react';
import notificationContext from '../../context/Notification/notificationContext';
import Notification from '../notification/Notification';
import MainHeader from './MainHeader';

const Layout = ({ children }) => {
  const { notification } = useContext(notificationContext);
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
    </>
  );
};

export default Layout;
