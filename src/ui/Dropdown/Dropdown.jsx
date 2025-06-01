import React from 'react';
import clsx from 'clsx';
import { DEFAULT_OPTIONS } from '@/constant.js';

import styles from './Dropdown.module.scss';

const Dropdown = ({
  id,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className = '',
}) => (
  <div className={clsx(styles.dropdownGroup, className)}>
    <div className={styles.dropdownWrapper}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={styles.dropdownField}
      >
        {options.map((opt) =>(
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.dropdownIcon} aria-hidden="true">&#9662;</span>
    </div>
  </div>
);
export default Dropdown
