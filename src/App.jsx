import "./App.css";
import HomePage from "./pages/HomePage";
import "bootstrap-icons/font/bootstrap-icons.css";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Favorite from "./pages/Favourite";

function App() {
  const theme = useSelector((state) => state.movies.theme); // Get the theme from Redux store

  // Toggle theme class on the body and root element
  useEffect(() => {
    // Remove the theme classes from both root and body
    document.body.classList.remove("light", "dark");
    const rootElement = document.getElementById("root");

    if (theme === "light") {
      document.body.classList.add("light");
      rootElement.classList.add("light");
      rootElement.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      rootElement.classList.add("dark");
      rootElement.classList.remove("light");
    }
  }, [theme]);

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode
  console.log(theme);

  return (
    <div className={` ${theme}`} style={{ backgroundColor: backgroundColor }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/search/:categoryId" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
