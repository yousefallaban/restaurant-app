import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import restaurantReducer from './slices/restaurantSlice';
import { watchFetchRestaurants } from './sagas/restaurantSaga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([watchFetchRestaurants()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
