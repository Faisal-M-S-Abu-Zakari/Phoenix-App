// movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    theme: "light", // Default theme is 'light'
    movies: storedMovies, // Get movies from local storage
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"; // Toggle between light and dark
    },
    setFavorite: (state, action) => {
      const movie = action.payload;
      const movieExists = state.movies.some((item) => item.id === movie.id);
      if (!movieExists) {
        const updatedMovies = [...state.movies, movie];
        state.movies = updatedMovies;
        localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies)); // Save to local storage
      } else {
        const updatedMovies = state.movies.filter(
          (item) => item.id !== movie.id
        );
        state.movies = updatedMovies;
        localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies)); // Update local storage
      }
    },
  },
});

export const { toggleTheme, setFavorite } = movieSlice.actions;
export default movieSlice.reducer;
