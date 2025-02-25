import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Trending.css";
import MovieCard from "./MovieCard";
import ModalPage from "../pages/Modal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Trending({ type, list }) {
  const sectionTitle =
    type === "movie" ? "Trending Movies" : "Trending TV Shows";
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const theme = useSelector((state) => state.movies.theme);

  // Theme-based styles
  const textColor = theme === "light" ? "black" : "white";
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d";

  const handleClick = (movie) => {
    setSelectedMovie(movie);
    setModalShow(true);
  };

  return (
    <section
      className="trending-section"
      style={{
        backgroundColor,
        color: textColor,
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div className="section-top">
        <h2 className="section-title">{sectionTitle}</h2>
        <Link className="show-more-btn" to={`/search/${type}`}>
          See More <i className="bi bi-arrow-right-circle"></i>
        </Link>
      </div>

      <div className="container" id="trending-container">
        <Row className="gx-3">
          {list && list.length > 0 ? (
            list.slice(0, 6).map((item) => (
              <Col
                key={item.id}
                xs={6}
                md={4}
                lg={2}
                onClick={() => handleClick(item)}
                className="column-gap-2"
              >
                <MovieCard
                  title={item.title || item.name}
                  path={item.poster_path}
                />
              </Col>
            ))
          ) : (
            <p>
              No trending {type === "movie" ? "movies" : "TV shows"} available.
            </p>
          )}
        </Row>
      </div>

      {modalShow && (
        <ModalPage
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={selectedMovie}
        />
      )}
    </section>
  );
}

export default Trending;
