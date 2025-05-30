import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

const Input = forwardRef(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      helperText,
      className = '',
      hasError = false,
      ...rest
    },
    ref
  ) => {
    const helperId = helperText && id ? `${id}-helper` : undefined;

    return (
      <div className={clsx(styles.inputGroup, className)}>
        {label && (
          <label className={styles.inputLabel} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={clsx(styles.inputField, hasError && styles.error)}
          aria-describedby={helperId}
          {...rest}
        />
        {helperText && (
          <div
            className={clsx(styles.helperText, hasError && styles.error)}
            id={helperId}
            role={hasError ? 'alert' : undefined}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
