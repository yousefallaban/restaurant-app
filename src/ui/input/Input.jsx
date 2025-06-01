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
      onClear,
      disabled,
      ...rest
    },
    ref
  ) => {
    const helperId = helperText && id ? `${id}-helper` : undefined;
    const showClear = Boolean(value && !disabled && typeof onClear === 'function');

    return (
      <div className={clsx(styles.inputGroup, className)}>
        {label && (
          <label className={styles.inputLabel} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          <input
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={clsx(styles.inputField, hasError && styles.error)}
            aria-describedby={helperId}
            {...rest}
          />
          {showClear && (
            <button
              type="button"
              className={styles.clearButton}
              aria-label="Clear input"
              onClick={onClear}
              tabIndex={0}
            >
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path d="M6 6l8 8M14 6l-8 8" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
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
