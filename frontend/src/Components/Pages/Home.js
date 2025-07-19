import React from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigation } from "../Resuable/Navigation";
import "../Styles/Home.css";
import pizza from "../../assests/images/pizzas1.png";
import Footer from "../Resuable/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Container style={{ backgroundColor: "#f2f2f2" }} fluid>
        <Row lg={12}>
          <Col lg={6} md={6}>
            <p className="mt-5 ms-5 pt-5 text-secondary cursive-font homep speedy ">
              <i style={{ fontSize: "10vh" }}>
                “Speedy Flavor"{" "}
                <span className="text-danger">"Anytime, Anywhere"</span>
              </i>
            </p>
            <Row className="mt-4 ms-5">
              <Button
                as={Link}
                to={"/reservation"}
                className="btn-hvr2"
                style={{
                  // border: "1px solid #DC3545",
                  border: "none",
                  height: "7vh",
                  width: "10rem",
                  marginLeft: "2vh",
                  marginBottom: "3vh",
                  color: "#DC3545",
                  backgroundColor: "white",
                  boxShadow: "0px 1px 10px #DC3545",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Book a Table
              </Button>
            </Row>
          </Col>
          <Col lg={5} md={5} className="d-none d-lg-block d-md-block">
            {" "}
            {/* Image hidden on mobile */}
            <Image
              style={{ width: "100%" }}
              className="logo-animation image1"
              src={pizza}
              rounded
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
