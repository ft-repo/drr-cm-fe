import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

export type AuthState = {
  credential: {
    username: string;
    role: string;
  }
}

const initialState: AuthState = {
  credential: {
    username: '',
    role: ''
  }
}

export const SLICE_NAME = 'AUTH_SLICE';

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      console.log('extra',action)
      return state = {
        ...state,
        ...(action?.['payload']?.[SLICE_NAME] || {})
      };
    });
  },
  reducers: {
    setCredential: (state: AuthState, action: PayloadAction<AuthState>) => {
      console.log(action.payload)
      state.credential = action.payload.credential
    },
    resetCredential: (state: AuthState) => {
      state.credential = initialState.credential
    }
  }
})

export const { setCredential, resetCredential } = authSlice.actions

export default authSlice.reducer