import React from 'react';
import styles from './button.module.css';
import Link from 'next/Link';

const Button = ({ link, children }) => {
  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
};

export default Button;
