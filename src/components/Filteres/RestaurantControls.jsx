import React from 'react';
import { useDispatch } from 'react-redux';

import { Dropdown } from '@/ui/index.js';
import RestaurantFilter from '@/components/Filteres/RestaurantFilter.jsx';
import { setSort } from '@/redux/slices/restaurantSlice.js';

const RestaurantControls = () => {
  const dispatch = useDispatch();

  const onSortChange = (e) => {
    const value = e.target.value;
    if (value) {
      dispatch(setSort(value));
    } else {
      dispatch(setSort());
    }
  };

  return (
    <div
      style={{ display: 'flex', gap: '1rem' }}
    >
      <RestaurantFilter />
      <Dropdown onChange={onSortChange} />
    </div>
  );
};

export default RestaurantControls;
