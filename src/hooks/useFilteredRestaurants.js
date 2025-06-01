import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useFilteredRestaurants = () => {
  const { data, filters, sort } = useSelector((state) => state.restaurants);
  const restaurants = data?.restaurants || [];

  return useMemo(() => {
    if (!Array.isArray(restaurants) || restaurants.length === 0) return [];

    const rawQuery = filters?.query || '';
    const q = rawQuery.trim().toLowerCase();

    const filtered = !q
      ? restaurants
      : restaurants.filter((r) => {
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

    if (!sort) return filtered;

    if (sort === 'rating') {
      return [...filtered].sort(
        (a, b) => (b.rating?.starRating || 0) - (a.rating?.starRating || 0)
      );
    }
    if (sort === 'driveDistanceMeters') {
      return [...filtered].sort(
        (a, b) => (a.driveDistanceMeters || 0) - (b.driveDistanceMeters || 0)
      );
    }
    if (sort === 'minimumDeliveryValue') {
      return [...filtered].sort(
        (a, b) => (a.minimumDeliveryValue || 0) - (b.minimumDeliveryValue || 0)
      );
    }

    return filtered;
  }, [restaurants, filters, sort]);
};
