import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
    loadingPage: '',
  },
  reducers: {
    updateLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      }
    },
  },
});

export const updateLoadingAction = (payload) => ({
  type: updateLoading,
  payload: payload,
});

export const { updateLoading } = loadingSlice.actions;
export const getLoadingStore = (state) => state.loading;

export default loadingSlice.reducer;
