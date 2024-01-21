import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from '@/lib/loading-store';
import searchSlice from '@/lib/search-store';

export const makeStore: AppStore = () => {
  return configureStore({
    reducer: {
      loading: loadingSlice,
      search: searchSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
