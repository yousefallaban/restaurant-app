import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useFilteredRestaurants = () => {
  const { data, filters } = useSelector(state => state.restaurants);
  const restaurants = data?.restaurants || [];

  return useMemo(() => {
    if (!Array.isArray(restaurants) || restaurants.length === 0) return [];

    const rawQuery = filters?.query || '';
    const q = rawQuery.trim().toLowerCase();

    if (!q) return restaurants;

    return restaurants.filter((r) => {
      const name = (r.name || '').toLowerCase();
      const cuisines = Array.isArray(r.cuisines) ? r.cuisines : [];
      const address = r.address || {};

      const city = (address.city || '').toLowerCase();
      const firstLine = (address.firstLine || '').toLowerCase();
      const postalCode = (address.postalCode || '').toLowerCase();

      return (
        name.includes(q) ||
        cuisines.some((c) => (c.name || '').toLowerCase().includes(q)) ||
        city.includes(q) ||
        firstLine.includes(q) ||
        postalCode.includes(q)
      );
    });
  }, [restaurants, filters]);
};
