import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Category.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Categories(props) {
  const theme = useSelector((state) => state.movies.theme);
  // Set background color based on the theme
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d"; // Dark background for dark mode
  console.log(theme);

  return (
    <section
      className="category-section"
      style={{ backgroundColor: backgroundColor }}
    >
      <h2 className="section-title">Movie Categories</h2>
      <Container>
        <Row className=" category-div ">
          {props.Categories.map((category) => (
            <Col
              key={category.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={`category-card ${theme}`}
            >
              <Link
                to={`search/${category.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <h4>{category.name}</h4>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Categories;
