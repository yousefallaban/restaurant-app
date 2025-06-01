import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react';
import { useFilteredRestaurants } from './useFilteredRestaurants';

const mockStore = configureStore([]);

const getWrapper =
  (store) =>
  ({ children }) => <Provider store={store}>{children}</Provider>;

const mockData = [
  {
    name: 'Pizza Palace',
    cuisines: [{ name: 'Pizza' }],
    address: { city: 'London', firstLine: '1 High St', postalCode: 'E1 6AN' },
    rating: { starRating: 4.5 },
    driveDistanceMeters: 1200,
    minimumDeliveryValue: 10,
  },
  {
    name: 'Curry House',
    cuisines: [{ name: 'Indian' }],
    address: {
      city: 'Manchester',
      firstLine: '22 Main Rd',
      postalCode: 'M1 1AA',
    },
    rating: { starRating: 3.8 },
    driveDistanceMeters: 4000,
    minimumDeliveryValue: 15,
  },
];

describe('useFilteredRestaurants', () => {
  it('returns all restaurants when there is no filter or sort', () => {
    const store = mockStore({
      restaurants: { data: { restaurants: mockData }, filters: {}, sort: '' },
    });

    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current.length).toBe(2);
  });

  it('filters by query (name, cuisine, city, address, postal code)', () => {
    const store = mockStore({
      restaurants: {
        data: { restaurants: mockData },
        filters: { query: 'pizza' },
        sort: '',
      },
    });
    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe('Pizza Palace');

    // cuisine filter
    store.getState().restaurants.filters.query = 'indian';
    const { result: cuisineResult } = renderHook(
      () => useFilteredRestaurants(),
      { wrapper: getWrapper(store) }
    );
    expect(cuisineResult.current[0].name).toBe('Curry House');

    // city filter
    store.getState().restaurants.filters.query = 'manchester';
    const { result: cityResult } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(cityResult.current[0].name).toBe('Curry House');
  });

  it('sorts by rating descending', () => {
    const store = mockStore({
      restaurants: {
        data: { restaurants: mockData },
        filters: {},
        sort: 'rating',
      },
    });

    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current[0].name).toBe('Pizza Palace');
    expect(result.current[1].name).toBe('Curry House');
  });

  it('sorts by delivery time ascending', () => {
    const store = mockStore({
      restaurants: {
        data: { restaurants: mockData },
        filters: {},
        sort: 'driveDistanceMeters',
      },
    });

    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current[0].name).toBe('Pizza Palace');
    expect(result.current[1].name).toBe('Curry House');
  });

  it('sorts by delivery cost ascending', () => {
    const store = mockStore({
      restaurants: {
        data: { restaurants: mockData },
        filters: {},
        sort: 'minimumDeliveryValue',
      },
    });

    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current[0].name).toBe('Pizza Palace');
    expect(result.current[1].name).toBe('Curry House');
  });

  it('returns empty array if no restaurants', () => {
    const store = mockStore({
      restaurants: { data: { restaurants: [] }, filters: {}, sort: '' },
    });

    const { result } = renderHook(() => useFilteredRestaurants(), {
      wrapper: getWrapper(store),
    });
    expect(result.current).toEqual([]);
  });
});
