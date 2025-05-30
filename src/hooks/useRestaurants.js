import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchRestaurantsRequest,
  clearError,
} from '../redux/slices/restaurantSlice';

export function useRestaurantSearch() {
  const dispatch = useDispatch();
  const { data, loading, error, query } = useSelector(
    (state) => state.restaurants
  );

  const fetchRestaurants = useCallback(
    (postcode) => {
      dispatch(fetchRestaurantsRequest(postcode));
    },
    [dispatch]
  );

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
    query,
    fetchRestaurants,
    resetError,
  };
}
