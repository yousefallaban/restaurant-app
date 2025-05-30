import { call, put, takeLatest, cancelled } from 'redux-saga/effects';
import { fetchRestaurantsByPostcode } from '@/api/restaurantApi.js';
import {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  setError,
} from '../slices/restaurantSlice';

function* fetchRestaurantsSaga(action) {
  const controller = new AbortController();

  try {
    const restaurants = yield call(
      fetchRestaurantsByPostcode,
      action.payload,
      controller.signal
    );
    yield put(fetchRestaurantsSuccess(restaurants));
  } catch (error) {
    const errorMessage = error?.message || 'Failed to fetch restaurants';
    yield put(setError(errorMessage));
  } finally {
    if (yield cancelled()) {
      controller.abort();
    }
  }
}

export function* watchFetchRestaurants() {
  yield takeLatest(fetchRestaurantsRequest.type, fetchRestaurantsSaga);
}
