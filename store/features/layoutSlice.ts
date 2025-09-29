import { createSlice } from '@reduxjs/toolkit'

export type LayoutState = {
  loading: boolean;
  fullscreen_loading: boolean;
  open_modal: boolean;
}

const initialState: LayoutState = {
  loading: false,
  fullscreen_loading: false,
  open_modal: false
}

export const SLICE_NAME = 'LAYOUT_SLICE';

const layoutSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setFullscreenLoading: (state, action) => {
      state.fullscreen_loading = action.payload
    },
    setOpenModal: (state, action) => {
      state.open_modal = action.payload
    }
  }
})

export const { setLoading, setFullscreenLoading, setOpenModal } = layoutSlice.actions

export default layoutSlice.reducer