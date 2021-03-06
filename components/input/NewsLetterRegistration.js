import { useContext, useRef, useState } from 'react';
import notificationContext from '../../context/Notification/notificationContext';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const notificationCtx = useContext(notificationContext);
  const { notification, showNotification } = notificationCtx;

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;

    if (!email || email.trim() === '' || !email.includes('@')) {
      setIsInvalid(true);
      return;
    }

    showNotification({
      title: 'Signing up...',
      status: 'pending',
      message: 'Registering to the newsletter',
    });

    fetch(`/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        showNotification({
          title: 'Success!',
          status: 'success',
          message: 'Successfully registered for the newsletter!',
        });
        setIsInvalid(false);
        emailInputRef.current.value = '';
      })
      .catch((error) => {
        showNotification({
          title: 'Error!',
          status: 'error',
          message: error.message || 'Something went wrong!',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {isInvalid && (
        <p className='center'>Please enter a valid email address</p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
