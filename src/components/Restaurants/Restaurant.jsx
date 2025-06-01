import React from 'react';
import { Image } from '@/ui';

import styles from './Restaurant.module.scss';

const Restaurant = ({ data = {} }) => {
  return (
    <div className={styles.restaurant}>
      <Image src={data.logoUrl} alt="User profile" />
      <div className={styles.details}>
        <h2 className={styles.name}>{data.name}</h2>
        <p className={styles.info}>
          <span className={styles.star}>★</span>
          <span className={styles.rating}>
            {data.rating.starRating} ({data.rating.count})
          </span>
        </p>
        <p className={styles.info}>
          <span className={styles.icon}>&#9873;</span>
          {data.address.city}</p>
        <div className={styles.labels}>
          <p className={styles.label}>{data.driveDistanceMeters}M away</p>
          <p className={styles.label}>
            {data.minimumDeliveryValue === 0
              ? 'Free delivery'
              : `€ ${data.minimumDeliveryValue} Delivery`}
          </p>
        </div>
        <p className={styles.info}>
          {data.cuisines.map((c) => c.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default Restaurant;
