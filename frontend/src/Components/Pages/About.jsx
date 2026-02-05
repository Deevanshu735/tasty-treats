import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { Navigation } from "../Resuable/Navigation";
import rest from "../../assests/images/Restaurenty3.png";
import Footer from "../Resuable/Footer";

export default function About() {
  return (
    <>
      <Navigation />
      <h2 className="text-center my-3  cursive-font">
        <span className="text-danger fs-1">ABOUT US</span>
      </h2>
      <Container>
        <Row lg={12}>
          <Col lg={6}>
            <Image
              style={{
                width: "100%",
                height: "360px",
                boxShadow: " 0 8px 8px #D3D3D3",
              }}
              src={rest}
            />
            <Row
              className="ms-1 my-4 "
              style={{
                border: "1.5px solid black",
                padding: "4px",
                width: "100%",
              }}
            >
              <h2 className="text-center">Book a Table</h2>
              <br />
              <h3 className="text-center text-danger"> +155895548833</h3>
            </Row>
          </Col>
          <Col lg={6}>
            <Container fluid>
              <h5
                style={{
                  textAlign: "justify",
                }}
              >
                Tasty Treat is a brand known for offering a variety of delicious
                and high-quality ready-to-eat treats. They cater to different
                tastes with products ranging from biscuits and namkeens to
                beverages and frozen snacks. Tasty Treats Restaurant, located in
                Ramnagar, is known for its focus on quality ingredients,
                delightful flavors, and exceptional service. It offers a cozy
                and refined ambiance, making it suitable for both quick bites
                and leisurely gatherings
              </h5>
              <h5>
                <Row className="my-4">
                  <Col lg={1} md={1} xs={1}>
                    {" "}
                    <FaCheckCircle className="fs-5 text-danger" />
                  </Col>
                  <Col
                    style={{
                      textAlign: "justify",
                      fontSize: "1rem",
                    }}
                  >
                    Tasty Treat offers a wide variety of snacks, including
                    biscuits, namkeens, chips, candies.
                  </Col>
                </Row>
              </h5>
              <h5>
                <Row>
                  <Col lg={1} md={1} xs={1}>
                    {" "}
                    <FaCheckCircle className="fs-5 text-danger" />
                  </Col>
                  <Col style={{ textAlign: "justify", fontSize: "1rem" }}>
                    With the motto of “Food You'll Love To Share”, Tasty Treat
                    not only hopes to bring amazing food at an affordable price
                  </Col>
                </Row>
              </h5>
              <h5>
                <Row>
                  <Col lg={1} md={1} xs={1}>
                    {" "}
                    <FaCheckCircle className="fs-5 text-danger" />
                  </Col>
                  <Col style={{ textAlign: "justify", fontSize: "1rem" }}>
                    Aenean vel gravida elit, non vestibulum sem. Vivamus
                    malesuada erat nec libero faucibus varius.
                  </Col>
                </Row>
              </h5>
            </Container>
            <h5 className="mt-4 ms-2" style={{ textAlign: "justify" }}>
              The restaurant provides a wide variety of dishes, including
              options for dine-in, online ordering, and takeaway. Tasty Treats
              aims to provide a satisfying experience with a menu that offers
              value and variety.
            </h5>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
