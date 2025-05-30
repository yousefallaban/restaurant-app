import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { useRestaurantSearch } from '@/hooks/useRestaurants.js';
import { renderHook, act } from '@testing-library/react';
import {
  fetchRestaurantsRequest,
  clearError,
} from '@/redux/slices/restaurantSlice';

const mockStore = configureMockStore([]);

const initialState = {
  restaurants: {
    data: [{ id: 1, name: 'Testaurant' }],
    loading: false,
    error: null,
    query: '',
  }
};

function wrapper({ children, store }) {
  return <Provider store={store}>{children}</Provider>;
}

describe('useRestaurantSearch', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn(store.dispatch);
  });

  it('returns initial state from the store', () => {
    const { result } = renderHook(() => useRestaurantSearch(), {
      wrapper: (props) => wrapper({ ...props, store }),
    });

    expect(result.current.data).toEqual([{ id: 1, name: 'Testaurant' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.query).toBe('');
  });

  it('dispatches fetchRestaurantsRequest when fetchRestaurants is called', () => {
    const { result } = renderHook(() => useRestaurantSearch(), {
      wrapper: (props) => wrapper({ ...props, store }),
    });

    act(() => {
      result.current.fetchRestaurants('12345');
    });

    expect(store.dispatch).toHaveBeenCalledWith(fetchRestaurantsRequest('12345'));
  });

  it('dispatches clearError when resetError is called', () => {
    const { result } = renderHook(() => useRestaurantSearch(), {
      wrapper: (props) => wrapper({ ...props, store }),
    });

    act(() => {
      result.current.resetError();
    });

    expect(store.dispatch).toHaveBeenCalledWith(clearError());
  });
});
