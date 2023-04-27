import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  profile: ''

}

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  },
})

export const { setName, setProfile } = activateSlice.actions

export default activateSlice.reducer