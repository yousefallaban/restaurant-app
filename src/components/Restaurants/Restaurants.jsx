import React from 'react';

import Restaurant from '@/components/Restaurants/Restaurant.jsx';
import { usePagination } from '@/hooks/usePagination.js';

import styles from './Restaurants.module.scss';

const Restaurants = () => {
  const { paginatedData, restaurantsCount } = usePagination();

  if (!Array.isArray(paginatedData) || paginatedData.length === 0) return null;

  return (
    <>
      <p>
        {restaurantsCount}{' '}
        {restaurantsCount === 1 ? 'restaurant' : 'restaurants'} found
      </p>

      <div className={styles.container}>
        {paginatedData.map((item, index) => (
          <Restaurant key={item.id || index} data={item} />
        ))}
      </div>
    </>
  );
};

export default Restaurants;
