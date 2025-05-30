import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
  query: '',
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    fetchRestaurantsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.query = action.payload;
    },
    fetchRestaurantsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  setError,
  clearError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
