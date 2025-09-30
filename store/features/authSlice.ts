import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Credential = {
  username: string;
  role: string;
  access_token: string;
}

export type AuthState = {
  credential: Credential;
}

const initialState: AuthState = {
  credential: {
    username: '',
    role: '',
    access_token: ''
  }
}

export const SLICE_NAME = 'AUTH_SLICE';

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCredential: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.credential = action.payload.credential
    },
    resetCredential: (state: AuthState) => {
      state.credential = initialState.credential
    }
  }
})

export const { setCredential, resetCredential } = authSlice.actions

export default authSlice.reducer