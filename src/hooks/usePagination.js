import { useSelector } from 'react-redux';
import { useFilteredRestaurants } from '@/hooks/useFilteredRestaurants.js';
import { useMemo } from 'react';

export const usePagination = () => {
  const { page, pageSize } = useSelector((state) => state.restaurants);
  const filtered = useFilteredRestaurants();

  const restaurantsCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(restaurantsCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const paginatedData = useMemo(() => (
    filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  ), [filtered, safePage, pageSize]);

  return {
    page: safePage,
    totalPages,
    paginatedData,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    restaurantsCount,
  };
};
