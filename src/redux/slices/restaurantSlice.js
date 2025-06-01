import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
  postcode: '',
  page: 1,
  pageSize: 18,
  filters: {
    query: '',
  },
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setPostcode(state, action) {
      state.postcode = action.payload;
      state.page = 1;
      state.loading = true;
      state.error = null;
    },
    setPage(state, action) {
      state.page = action.payload;
      state.loading = true;
      state.error = null;
    },
    fetchRestaurantsRequest(state) {
      state.loading = true;
      state.error = null;
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
    setFilter(state, action) {
      state.filters[action.payload.field] = action.payload.value;
      state.page = 1;
    },
    clearFilters(state) {
      state.filters = {};
    },
  },
});

export const {
  setPostcode,
  setPage,
  fetchRestaurantsRequest,
  fetchRestaurantsSuccess,
  setError,
  clearError,
  setFilter,
  clearFilters,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
