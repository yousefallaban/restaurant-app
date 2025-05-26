import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Todo : Replace with actual reducers
const dummyReducer = (state = {}, action) => state;

const rootReducer = combineReducers({
  dummy: dummyReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(function* rootSaga() {
  // Todo: Replace with actual sagas
});

export default store;
