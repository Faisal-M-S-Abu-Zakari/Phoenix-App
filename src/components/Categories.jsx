import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Category.css";

function Categories({ Categories }) {
  const theme = useSelector((state) => state.movies.theme);
  const backgroundColor = theme === "light" ? "transparent" : "#322d2d";

  return (
    <section className="category-section" style={{ backgroundColor }}>
      <h2 className="section-title">Movie Categories</h2>
      <Container>
        <Row className="category-div">
          {Categories.map((category) => (
            <Col
              key={category.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={`category-card ${theme}`}
            >
              <Link to={`/search/${category.id}`} className="category-link">
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
