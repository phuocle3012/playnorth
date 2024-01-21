import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
  },
  reducers: {
    updateSearch(state, action) {
      return {
        ...state,
        searchText: action.payload
      };
    },
  },
});

export const updateSearchAction = (payload) => ({
  type: updateSearch,
  payload: payload,
});

export const { updateSearch } = searchSlice.actions;
export const getSearchStore = (state) => state.search;

export default searchSlice.reducer;
