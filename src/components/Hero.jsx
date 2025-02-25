import React, { useEffect, useState } from "react";
import { Form, Image } from "react-bootstrap";
import hero from "../images/hero.png";
import cut from "../images/cut.png";
import "./hero.style.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ModalPage from "../pages/Modal";
import { useSelector } from "react-redux";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const API_KEY = "7792f658dc61c92c4e96986fb82e1766";
  const theme = useSelector((state) => state.movies.theme);

  useEffect(() => {
    if (query.length > 0) {
      fetchResults();
    } else {
      setSearchRes([]);
    }
  }, [query]);

  const fetchResults = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSearchRes(data.results))
      .catch((error) => console.log(error));
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const textColor = theme === "light" ? "#545050" : "white";
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d";

  return (
    <div className={`hero py-5 ${theme}`} style={{ backgroundColor }}>
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* Image Section */}
          <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
            <Image src={hero} alt="hero" className="hero-image img-fluid" />
          </div>

          {/* Text and Search Section */}
          <div className="col-lg-6 col-md-12 col-sm-12 text-center text-lg-start">
            <h1 className="hero-text">Welcome to Phoenix Movies</h1>
            <p className="hero-text2" style={{ color: textColor }}>
              Find, Search and enjoy movies like never before!
              <Image src={cut} alt="cut" style={{ width: "50px" }} />
            </p>

            {/* Search Bar */}
            <div className="search-bar d-flex flex-column flex-md-row align-items-center justify-content-center">
              <Link to={`/search/${query}`} className="search-icon">
                <FontAwesomeIcon icon={faSearch} className="icon" />
              </Link>
              <Form.Control
                className="input"
                type="text"
                placeholder="Search here ..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Search Results */}
            {query.length > 0 && (
              <ul className="search-res-list">
                {searchRes.slice(0, 6).map((item, index) => (
                  <li
                    key={index}
                    className="search-res-item"
                    onClick={() => handleMovieClick(item)}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt="poster"
                        className="search-res-img"
                      />
                      <p className="search-res-title">{item.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Modal for Selected Movie */}
            {selectedMovie && (
              <ModalPage
                show={true}
                onHide={() => setSelectedMovie(null)}
                movie={selectedMovie}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
