import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from '@/ui';
import { setFilter } from '@/redux/slices/restaurantSlice';

const RestaurantFilter = () => {
  const { filters } = useSelector(state => state.restaurants);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter({ field: 'query', value: e.target.value }));
  };

  return (
    <Input
      type="text"
      placeholder="Filter by name or cuisine…"
      value={filters.query || ''}
      onChange={handleChange}
    />
  );
};

export default RestaurantFilter;
