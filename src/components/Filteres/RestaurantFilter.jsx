import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Input } from '@/ui';
import { setFilter, clearFilters } from '@/redux/slices/restaurantSlice';

const RestaurantFilter = () => {
  const { filters } = useSelector(state => state.restaurants);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter({ field: 'query', value: e.target.value }));
  };
  const handleClear = () => {
    dispatch(clearFilters());
  };

  return (
    <Input
      type="text"
      placeholder="Filter by name or cuisine or place"
      value={filters.query || ''}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
};

export default RestaurantFilter;
