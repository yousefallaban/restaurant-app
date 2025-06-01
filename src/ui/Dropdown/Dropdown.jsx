import React from 'react';
import clsx from 'clsx';
import styles from './Dropdown.module.scss';

const DEFAULT_OPTIONS = [
  {
    value: 'rating',
    label: 'Reviews',
  },
  {
    value: 'driveDistanceMeters',
    label: 'Delivery time',
  },
  {
    value: 'minimumDeliveryValue',
    label: 'Delivery cost',
  },
];
export default function Dropdown({
  id,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className = '',
  placeholder = 'Best match',
}) {
  return (
    <div className={clsx(styles.dropdownGroup, className)}>
      <div className={styles.dropdownWrapper}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={styles.dropdownField}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
}
