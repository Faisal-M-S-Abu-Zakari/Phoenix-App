import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlices'; // Import your movieSlice

const store = configureStore({
  reducer: {
    movies: movieReducer, // Add the movie slice here
  },
});

export default store;
