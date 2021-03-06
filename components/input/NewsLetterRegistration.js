import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState('');

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;

    if (!email || email.trim() === '' || !email.includes('@')) {
      setIsInvalid(true);
      return;
    }

    fetch(`/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmailSuccess(data.message);
        setIsInvalid(false);
        emailInputRef.current.value = '';
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
      {isInvalid && <p>Please enter a valid email address</p>}
      {emailSuccess && <p>{emailSuccess}</p>}
    </section>
  );
}

export default NewsletterRegistration;
