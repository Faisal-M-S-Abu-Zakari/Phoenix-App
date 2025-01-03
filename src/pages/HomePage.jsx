import React, { useState } from "react";
import NavBar from "../utilites/NavBar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import About from "./../components/About";
import Trending from "./../components/Trending";
import Footer from "../components/Footer";
import { useEffect } from "react";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const [CategoriesList, setCategoriesList] = useState([]);
  const [TrendingTvList, setTrendingTvList] = useState([]);
  const [TrendingMovieList, setTrendingMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "7792f658dc61c92c4e96986fb82e1766";
  useEffect(() => {
    fetchCategories();
    fetchTrendingTv();
    fetchTrendingMovies();
  }, []);
  const fetchCategories = () => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategoriesList(JSON.parse(storedCategories));
    } else {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => {
          setCategoriesList(data.genres);
          localStorage.setItem("categories", JSON.stringify(data.genres));
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  const fetchTrendingMovies = () => {
    const storedTrendingMovies = localStorage.getItem("trendingMovies");
    if (storedTrendingMovies) {
      setTrendingMovieList(JSON.parse(storedTrendingMovies));
    } else {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY} `
      )
        .then((response) => response.json())
        .then((data) => {
          setTrendingMovieList(data.results);
          localStorage.setItem("trendingMovies", JSON.stringify(data.results));
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const fetchTrendingTv = () => {
    const storedTrendingTv = localStorage.getItem("trendingTv");
    if (storedTrendingTv) {
      setTrendingTvList(JSON.parse(storedTrendingTv));
    } else {
      setIsLoading(true);
      fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setTrendingTvList(data.results);
          localStorage.setItem("trendingTv", JSON.stringify(data.results));
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="container-fluid p-0 homePage">
      <NavBar Categories={CategoriesList} />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Hero />
          <div>
            <Trending type="movie" list={TrendingMovieList} />
          </div>
          <div>
            <Trending type="tv" list={TrendingTvList} />
          </div>
          <div>
            <Categories Categories={CategoriesList} />
          </div>
          <div>
            <About />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
