import React from 'react';

import about from '../images/about.png';
import './About.css';  // Make sure to import the CSS file
import { useSelector } from 'react-redux';

const About = () => {
  const theme = useSelector((state) => state.movies.theme);
       // Set text color based on the theme
  const textColor = theme === "light" ? "#322d2d" : "white"; // White for dark mode, black for light mode

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode

  return (
    <section className="about pt-2"  id="about-section" style={{ backgroundColor: backgroundColor }}>
      <div className="about-content">
        <h1>About Us</h1>
        <p style={{ color: textColor }}>
          Welcome to Phoenix Movies, a streamlined platform designed for movie and TV show lovers. Our website offers
          an effortless way to explore trending titles and discover new favorites. We believe in simplicity, so there's
          no need for signing up—just dive in and start exploring.<br />
          With a clean, user-friendly interface, Phoenix Movies makes it easy to browse through the latest movies and
          TV shows, find detailed information, and curate your personal list of favorites. Whether you're here to check
          out the hottest trends or to find something new to watch, we’ve made it simple and straightforward.
          Start your journey into the world of entertainment with us—your next favorite movie or show is just a click
          away!
        </p>
      </div>
      <img src={about} alt="About" />
    </section>
  );
};

export default About;
