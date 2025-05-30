import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'filled', // 'filled' or 'outline'
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
  ...rest
}) => (
  <button
    type={type}
    className={clsx(
      styles.buttonBase,
      fullWidth && styles.fullWidth,
      variant === 'outline' ? styles.outline : styles.filled,
      className
    )}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
