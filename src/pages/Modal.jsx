import Modal from "react-bootstrap/Modal";
import { Image } from "react-bootstrap";
import "./Popup.css";

import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "../Store/movieSlices"; // Import setFavorite action

function ModalPage({ show, onHide, movie }) {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.movies.movies); // Access movies from Redux state
  const theme = useSelector((state) => state.movies.theme);

  // Set text color based on the theme
  const textColor = theme === "light" ? "#322d2d" : "white"; // White for dark mode, black for light mode

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode

  // Check if the movie is already in the favorite list
  const isFavorite = favorite.some((item) => item.id === movie.id);

  // Handle button click to toggle favorite
  const handleBtn = () => {
    dispatch(setFavorite(movie)); // Dispatch the action to toggle the favorite
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal"
      className="custom-modal"
    >
      <div className="popup" style={{ background: backgroundColor }}>
        <div className="popup-content">
          {/* Image Section */}
          <div className="image-section">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          {/* Left-Side Content */}
          <div className="right-side">
            <Modal.Body>
              <div className="title">
                <h2 className="spider">{movie.title}</h2>
                <div className="rating">
                  <span className="imdb">IMDb</span>
                  <span className="score">7/10</span>{" "}
                  {/* Replace with actual rating if available */}
                </div>
              </div>
              <p className="desc" style={{ color: textColor }}>
                {movie.overview}
              </p>
              <button
                className={`glow-button ${isFavorite ? "btn" : ""}`} // Highlight button if it's a favorite
                onClick={handleBtn}
              >
                <i
                  className={`bi bi-heart ${isFavorite ? "clickIcon" : ""}`}
                ></i>
                <span className={isFavorite ? "clicked" : ""}>
                  {isFavorite ? "Remove From Your List" : "ADD TO YOUR LIST"}
                </span>
              </button>
            </Modal.Body>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalPage;
