import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Phoenix from "../images/logo.png";
import { Col, Form } from "react-bootstrap";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Store/movieSlices"; // Import the toggleTheme action

function NavBar(props) {
  const [show, setShow] = useState(false);
  const theme = useSelector((state) => state.movies.theme);
  const dispatch = useDispatch();

  // Handle theme toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  };

  // Set text color based on the theme
  const textColor = theme === "light" ? "black" : "white"; // White for dark mode, black for light mode

  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "white" : "#322d2d"; // Dark background for dark mode

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`px-5 navBar ${theme}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <Col className="d-flex align-items-center">
        <Link to="/" className="nav-link d-flex align-items-center">
          <Navbar.Brand
            href="#home"
            style={{ fontSize: "25px", color: textColor }}
          >
            Phoenix Movies
          </Navbar.Brand>
          <Image src={Phoenix} roundedCircle style={{ width: "50px" }} />
        </Link>
      </Col>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className={` custom-burger${theme}`}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Col
          className="d-flex justify-content-between align-items-center"
          lg={12}
        >
          <Nav className={`d-flex gap-4`}>
            <Link
              to="/"
              className={`links nav-link`}
              style={{ color: textColor }}
            >
              Home
            </Link>
            <a
              href="#about-section"
              className={`links nav-link`}
              style={{ color: textColor, textDecoration: "none" }}
            >
              About
            </a>
            <NavDropdown
              title="Movies"
              id="collapsible-nav-dropdown"
              className="custom-dropdown"
              menuVariant={theme === "light" ? "light" : "dark"}
              style={{
                // backgroundColor: theme === "light" ? "white" : "#322d2d", // Dropdown background
                color: theme === "light" ? "black" : "white", // General text color
              }}
            >
              {props.Categories.map((item) => (
                <NavDropdown.Item
                  key={item.id}
                  className={`custom-dropdown-item ${theme}`}
                  style={{
                    color: "black", // Explicit dark color for item text
                    backgroundColor: theme === "light" ? "white" : "#322d2d", // Dynamic background color
                  }}
                >
                  <Link
                    className="item nav-link"
                    to={`/search/${item.id}`}
                    style={{
                      color: "black", // Force dark text for links
                      textDecoration: "none", // No underline
                    }}
                  >
                    {item.name}
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Link
              to={`/favorite`}
              className={`links nav-link`}
              style={{ color: textColor }}
            >
              My List
            </Link>
          </Nav>
          {show && (
            <div className="search-bar-div">
              <i className="bi bi-search"></i>
              <Form.Control
                className="input"
                type="text"
                id="text"
                aria-describedby="passwordHelpBlock"
                placeholder="Search here ..."
              />
              <ul className="search-res-list" id="search-res-list"></ul>
            </div>
          )}

          <Nav>
            <div onClick={handleThemeToggle} className="theme-toggle-icon">
              <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className="icon"
                style={{ fontSize: "25px", color: textColor }}
              />
            </div>
          </Nav>
        </Col>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
