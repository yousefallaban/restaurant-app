import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useFilteredRestaurants = () => {
  const { data, filters } = useSelector(state => state.restaurants);
  const restaurants = data?.restaurants || [];

  return useMemo(() => {
    if (!Array.isArray(restaurants) || restaurants.length === 0) return [];
    if (!filters?.query) return restaurants;

    const q = filters.query.toLowerCase();

    return restaurants.filter((r) => {
      const name = r.name ? r.name.toLowerCase() : '';
      const cuisines = Array.isArray(r.cuisines) ? r.cuisines : [];
      const address = typeof r.address === 'string' ? r.address.toLowerCase() : '';

      return (
        name.includes(q) ||
        cuisines.some((c) => (c.name ? c.name.toLowerCase().includes(q) : false)) ||
        address.includes(q)
      );
    });
  }, [restaurants, filters]);
};
