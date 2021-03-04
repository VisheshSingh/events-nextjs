import React from 'react';
import styles from './button.module.css';
import Link from 'next/Link';

const Button = ({ link, children, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
