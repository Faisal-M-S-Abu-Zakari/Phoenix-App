import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Trending.css";

const MovieCard = (props) => {
  const { title, path } = props;
  const fullImageUrl = `https://image.tmdb.org/t/p/w300${path}`;
  const theme = useSelector((state) => state.movies.theme);

  // Theme-based styles
  const textColor = theme === "light" ? "black" : "white";
  const cardBackgroundColor = theme === "light" ? "#f8f9fa" : "#2c2c2c";

  return (
    <Card
      className="movie-poster p-3 border-0 text-center mb-3 "
      style={{
        backgroundColor: cardBackgroundColor,
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >
      <Card.Img
        variant="top"
        src={fullImageUrl}
        alt={title}
        className="card-poster"
      />
      <Card.Body>
        <Card.Title
          className="card-title"
          style={{
            fontSize: "16px",
            color: textColor,
          }}
        >
          {title.length > 20 ? `${title.substring(0, 20)}...` : title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
