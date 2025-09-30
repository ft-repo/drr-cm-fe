import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {
  auth,
  layout,
  // {{import}}
} from '@/store'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: auth,
      layout: layout,
      // {{export}}
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, {});