import { useFilteredRestaurants } from '@/hooks/useFilteredRestaurants.js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const usePagination = () => {
  const {
    page,
    pageSize,
  } = useSelector((state) => state.restaurants);
  const filteredRestaurants = useFilteredRestaurants();

  const totalPages = Math.max(
    1,
    Math.ceil((filteredRestaurants?.length || 0) / pageSize)
  );
  const safePage = Math.min(Math.max(1, page), totalPages);

  const paginatedData = useMemo(() => {
    if (!Array.isArray(filteredRestaurants) || filteredRestaurants.length === 0) return [];
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return filteredRestaurants.slice(start, end);
  }, [filteredRestaurants, safePage, pageSize]);

  return {
    page: safePage,
    totalPages,
    paginatedData,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    restaurantsCount: filteredRestaurants.length,
  };
};
