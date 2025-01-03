import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import hero from '../images/hero.png';
import cut from '../images/cut.png';
import './hero.style.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ModalPage from '../pages/Modal';
import {  useSelector } from 'react-redux';



const Hero = () => {
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Manage selected movie
  const API_KEY = '7792f658dc61c92c4e96986fb82e1766';
  const theme = useSelector((state) => state.movies.theme);

  useEffect(() => {
    if (query.length > 0) {
      fetchResults();
    } else {
      setSearchRes([]); // Clear results when query is empty
    }
  }, [query]);

  const fetchResults = () => {
    try {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => setSearchRes(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const handelChange = (e) => {
    setQuery(e.target.value);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
  };
   

      // Set text color based on the theme
  const textColor = theme === "light" ? "#545050" : "white"; // White for dark mode, black for light mode

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode

  return (
    <div className={`hero pt-5 ${theme}`} style={{ backgroundColor: backgroundColor }}>
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <img src={hero} alt="hero" className="hero-image" />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-start flex-column">
          <h1 className="hero-text">Welcome to Phoenix Movies</h1>
          <p className="hero-text2" style={{ color: textColor }}>
            Find, Search and enjoy movies like never before!{' '}
            <img src={cut} alt="cut" style={{ width: '50px' }} />
          </p>
          <div className="search-bar">
            <div className="search-icon">
              <Link
                to={`/search/${query}`} // Pass query as a parameter
                style={{
                  textDecoration: 'none', // Removes underline
                  color: 'inherit', // Inherits color from parent
                }}
              >
                <FontAwesomeIcon icon={faSearch} className={`icon `} style={{ fontSize: '25px' , color: textColor }} />
              </Link>
            </div>
            <Form.Control
              className="input"
              type="text"
              id="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Search here ..."
              onChange={handelChange}
            />
            {/* Search Results */}
            {query.length > 0 && (
              <ul className="search-res-list">
                {searchRes.slice(0, 6).map((item, index) => (
                  <li key={index} className="search-res-item" onClick={() => handleMovieClick(item)}>
                    <div className="search-res-item d-flex align-items-center">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt="poster"
                        style={{ width: '50px' }}
                      />
                      <p className="search-res-title">{item.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Show Modal if Movie is Selected */}
          {selectedMovie && (
            <ModalPage
              show={true}
              onHide={() => setSelectedMovie(null)} // Close modal on hide
              movie={selectedMovie} // Pass selected movie as a prop
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
