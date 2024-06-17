import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken(state, action) {
      return action.payload; // Set the token to the payload
    },
    clearToken(state) {
      return ''; // Clear the token
    }
  }
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;

