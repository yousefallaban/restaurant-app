import React from 'react';
import { Image } from '@/ui';

import styles from './Restaurant.module.scss';

const Restaurant = ({ data = {} }) => {
  return (
    <div className={styles.restaurant}>
      <Image
        src={data.logoUrl}
        alt="User profile"
      />
      <div className={styles.details}>
        <h2 className={styles.name}>{data.name}</h2>

        <p className={styles.info}>
          Rating: {data.rating.starRating} ({data.rating.count})
        </p>
        <p className={styles.info}>
          {data.address.city}
        </p>
        <p className={styles.info}>
          {data.cuisines.map((c) => c.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default Restaurant;
