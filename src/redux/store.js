import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    token: tokenReducer
    // Other reducers can be added here
  }
});

export default store;

