import React, { useEffect, useState } from "react";
import NavBar from "../utilites/NavBar";
import { useParams } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import ModalPage from "./Modal";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";

const SearchPage = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [moviesType, setMoviesType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { categoryId } = useParams();
  const API_KEY = "7792f658dc61c92c4e96986fb82e1766";
  const theme = useSelector((state) => state.movies.theme);

  useEffect(() => {
    fetchCategories();
    if (categoryId === "movie" || categoryId === "tv") {
      fetchTrending(categoryId); // Pass categoryId for trending
    } else if (!isNaN(categoryId)) {
      fetchCategoryType(categoryId); // Fetch by genre ID if it's a number
    } else {
      fetchResults(); // Fetch search results
    }
  }, [categoryId]);

  const fetchCategories = () => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategoriesList(JSON.parse(storedCategories));
    } else {
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => {
          setCategoriesList(data.genres);
          localStorage.setItem("categories", JSON.stringify(data.genres));
        })
        .catch((error) => console.log(error));
    }
  };

  const fetchCategoryType = (genreId) => {
    const storedCategoryMovies = localStorage.getItem(`category_${genreId}`);
    if (storedCategoryMovies) {
      setMoviesType(JSON.parse(storedCategoryMovies));
    } else {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          setMoviesType(data.results);
          localStorage.setItem(
            `category_${genreId}`,
            JSON.stringify(data.results)
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const fetchTrending = (type) => {
    const storedTrending = localStorage.getItem(`trending_${type}`);
    if (storedTrending) {
      setMoviesType(JSON.parse(storedTrending));
    } else {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMoviesType(data.results);
          localStorage.setItem(
            `trending_${type}`,
            JSON.stringify(data.results)
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  const fetchResults = () => {
    const storedResults = localStorage.getItem(`search_${categoryId}`);
    if (storedResults) {
      setMoviesType(JSON.parse(storedResults));
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          categoryId
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMoviesType(data.results);
          localStorage.setItem(
            `search_${categoryId}`,
            JSON.stringify(data.results)
          );
        })
        .catch((error) => console.log(error));
    }
  };
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
  };
  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode

  return (
    <div
      className="container-fluid p-0 homePage"
      style={{ minHeight: "100vh", background: backgroundColor }}
    >
      <NavBar Categories={categoriesList} />

      <Container className="pt-5 pb-5">
        {isLoading ? (
          <LoadingPage />
        ) : moviesType && moviesType.length > 0 ? (
          moviesType.map((movie) => (
            <Col
              key={movie.id}
              xs={6}
              md={4}
              lg={2}
              onClick={() => {
                setModalShow(true);
                handleMovieClick(movie);
              }}
            >
              <MovieCard
                title={movie.title || movie.name}
                path={movie.poster_path}
              />
            </Col>
          ))
        ) : (
          <p>No results available.</p>
        )}
      </Container>
      {modalShow && (
        <ModalPage
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={selectedMovie}
        />
      )}
    </div>
  );
};

export default SearchPage;
