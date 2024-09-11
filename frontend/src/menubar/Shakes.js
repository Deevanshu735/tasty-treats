import React from "react";
import { Container, Row, Nav, Card } from "react-bootstrap"; // Combined import

import s1 from "./project/shake1.png";
import s2 from "./project/shake2.png";
import s3 from "./project/shake3.png";
import s4 from "./project/shake4.png";
import s5 from "./project/D1.png";
// import s6 from "./project/D2.png";
import { Navigation } from "./Navigation";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Shakes() {
  const menustyle = {
    textDecoration: "none",
    color: "black",
    textAlign: "center",
    marginLeft: "5px",
  };
  const cardStyle = {
    marginTop: "20px",
    width: "21rem",
    height: "25rem",
    border: "1px solid white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const ContentImage = [
    {
      Image: s1,
      Name: "Vanilla Shake",
      Price: "60/-",
    },
    {
      Image: s2,
      Name: "Butter scotch",
      Price: "60/-",
    },
    {
      Image: s3,
      Name: "Oreo Shake",
      Price: "70/-",
    },
    {
      Image: s4,
      Name: "chocolate Shake",
      Price: "70/-",
    },
    {
      Image: s5,
      Name: "Virgin Mojito",
      Price: "60/-",
    },
    {
      Image: s5,
      Name: "Fresh kiwi",
      Price: "70/-",
    },
  ];

  return (
    <>
      <Navigation />
      <Container className="pt-4" fluid>
        <h2 className="text-center text-danger cursive-font fs">OUR MENU</h2>
        <Nav style={menustyle} className="justify-content-center">
          <Nav.Link style={menustyle} as={Link} to={"/menu"}>
            Veg Pizza
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/burger"}>
            Burger
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/sandwich"}>
            Sandwich
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/pasta"}>
            Pasta
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/shakes"}>
            Shakes/Drinks
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/stuff"}>
            Stuff
          </Nav.Link>
          <Nav.Link style={menustyle} as={Link} to={"/chinese"}>
            Chinese
          </Nav.Link>
        </Nav>
        <Container>
          <Row className="d-flex justify-content-around pt-0">
            {ContentImage.map((item, index) => (
              <Card
                key={index} // Unique key for each item
                style={cardStyle}
              >
                <Card.Body className="  position-relative">
                  <Row xs={12}>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                      {" "}
                      <img
                        className="img-fluid w-75 h-100"
                        src={item.Image}
                        alt={item.Name}
                      />
                    </Col>
                    <Col xs={2}></Col>
                  </Row>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                      <h5 className="text-center">{item.Name}</h5>
                    </Col>
                    <Col xs={2}></Col>
                  </Row>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                      <h4 className=" text-danger text-center">
                        <span className="text-black text-center">
                          Price : &#8377;{" "}
                        </span>
                        {item.Price}
                      </h4>
                    </Col>
                    <Col xs={2}></Col>
                  </Row>
                  <Row xs={12}>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                      {" "}
                      <Button
                        as={Link}
                        to={"/reg"}
                        className="btn-hvr "
                        style={{
                          width: "100%",
                          color: "black",
                          textAlign: "center",
                        }}
                        variant="outline-danger"
                      >
                        Order Now
                      </Button>
                    </Col>
                    <Col xs={2}></Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}
