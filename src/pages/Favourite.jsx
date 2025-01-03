import React, { useEffect, useState } from "react";
import NavBar from "../utilites/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import ModalPage from "./Modal";
import { setFavorite } from "../Store/movieSlices"; // Import the setFavorite action
import "./Favorite.css";

const Favorite = () => {
  const [CategoriesList, setCategoriesList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const favorite = useSelector((state) => state.movies.movies); // Access movies from Redux state
  const API_KEY = "7792f658dc61c92c4e96986fb82e1766";
  const theme = useSelector((state) => state.movies.theme);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setCategoriesList(data.genres))
      .catch((error) => console.log(error));
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
  };

  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode
  const textColor = theme === "light" ? "#322d2d" : "white"; // White for dark mode, black for light mode

  return (
    <div
      className="container-fluid p-0 homePage"
      style={{ minHeight: "100vh", background: backgroundColor }}
    >
      <NavBar Categories={CategoriesList} />
      <p
        style={{
          padding: "0 30px",
          color: "#322d2d",
          fontFamily: '"Agbalumo", system-ui',
          fontSize: "45px",
          marginBottom: "50px",
          color: textColor,
        }}
      >
        Your Favorites
      </p>
      <Container className="d-flex justify-content-center py-5">
        {favorite.length > 0 ? (
          favorite.map((movie) => (
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
          <div className="d-flex justify-content-center align-items-center empty-list-container">
            <p className="empty-list-text">Your List is Empty</p>
          </div>
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

export default Favorite;
