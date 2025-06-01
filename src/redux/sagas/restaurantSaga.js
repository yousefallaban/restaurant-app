import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { fetchRestaurantsByPostcode } from '@/api/restaurantApi.js';
import {
  setPostcode,
  setPage,
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  setError,
} from '../slices/restaurantSlice';

const getRestaurantState = (state) => state.restaurants;

// fetch data when postcode changes
function* fetchOnPostcodeChange() {
  const { postcode } = yield select(getRestaurantState);
  if (!postcode) return;
  yield put(fetchRestaurantsRequest());
  try {
    const restaurants = yield call(fetchRestaurantsByPostcode, postcode);
    yield put(fetchRestaurantsSuccess(restaurants));
  } catch (error) {
    yield put(setError(error?.message || 'Failed to fetch restaurants'));
  }
}

// sync URL when Redux changes
function* syncUrlWithRedux() {
  const { postcode, page } = yield select(getRestaurantState);
  const params = new URLSearchParams();
  if (postcode) params.set('postcode', postcode);
  if (page) params.set('page', page);
  window.history.replaceState(null, '', `/restaurants?${params.toString()}`);
}

// Watchers
export function* watchRestaurants() {
  yield takeLatest(setPostcode.type, fetchOnPostcodeChange);
  yield takeEvery([setPostcode.type, setPage.type], syncUrlWithRedux);
}
