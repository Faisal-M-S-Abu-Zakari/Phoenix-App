import React from 'react';
import './Footer.css';
import { useSelector } from 'react-redux';

const Footer = () => {
  const theme = useSelector((state) => state.movies.theme);
       // Set text color based on the theme
  const textColor = theme === "light" ? "white" : "#322d2d"; // White for dark mode, black for light mode

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "#322d2d" : "transparent"; // Dark background for dark mode

  return (
    <footer style={{ backgroundColor: backgroundColor }} >
      <div className="left-footer" >
        <h3 style={{ color: textColor }} > Phoenix Movies</h3>
        <span style={{ color: textColor }} >&copy;2024 Phoenix Movies. All Rights Reserved</span>
        <ul style={{ color: textColor }} >
          <li>Home | Trending | Movies | TV Shows | Favorites</li>
          <li>Powered by The Movie Database (TMDB) API</li>
        </ul>
      </div>
      <div className="right-footer" style={{ color: textColor }} >
        <h3>Follow Phoenix Squad:</h3>
        <ul >
          <li>
            <a className="social" href="#" >
              <div className="facebook">
                <i className="bi bi-facebook"></i>
              </div>
              <span style={{ color: textColor }} >Facebook</span>
            </a>
          </li>
          <li>
            <a className="social" href="#">
              <div className="instagram">
                <i className="bi bi-instagram"></i>
              </div>
              <span style={{ color: textColor }} >Instagram</span>
            </a>
          </li>
          <li>
            <a className="social" href="#">
              <div className="linkedin">
                <i className="bi bi-linkedin"></i>
              </div>
              <span style={{ color: textColor }} >LinkedIn</span>
            </a>
          </li>
          <li>
            <a className="social" href="#">
              <div className="email">
                <i className="bi bi-envelope"></i>
              </div>
              <span style={{ color: textColor }} >Email</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
