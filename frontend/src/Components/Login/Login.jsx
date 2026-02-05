import React, { useState } from "react";
import { Button, Container, Col, Card, Image, Row } from "react-bootstrap";
import { Navigation } from "../Resuable/Navigation";
import Wallpaper1 from "../../assests/images/Chef2.png";
import Wallpaper2 from "../../assests/images/Chef1.png";
import LoginForm from "./Loginform";
import RegisterForm from "./RegisterForm";

function Login() {
  const [loginTab, setLoginTab] = useState(true);

  return (
    <>
      <Navigation />
      <Container fluid className="d-flex align-items-center min-vh-100" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
        <Row className="w-100 align-items-center">
          {/* Left side PNG */}
          <Col xs={12} md={4} className="d-none d-md-block">
            <Image
              src={Wallpaper2}
              alt="Chef illustration"
              fluid
              className="w-100"
              style={{ filter: "drop-shadow(2px 6px 8px)" }}
            />
          </Col>

          {/* Login/Register Card */}
          <Col xs={12} md={4} className="my-4">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-4 p-md-5">
                {/* Toggle between Login and Register */}
                <div className="d-flex justify-content-center mb-4 p-1 bg-light rounded-pill border">
                  <Button
                    variant={loginTab ? "danger" : "transparent"}
                    className={`w-50 rounded-pill fw-bold transition-all ${loginTab ? "shadow-sm" : "text-dark"}`}
                    onClick={() => setLoginTab(true)}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant={!loginTab ? "danger" : "transparent"}
                    className={`w-50 rounded-pill fw-bold transition-all ${!loginTab ? "shadow-sm" : "text-dark"}`}
                    onClick={() => setLoginTab(false)}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    Register
                  </Button>
                </div>

                {/* Forms */}
                <div className="position-relative">
                  {loginTab ? <LoginForm /> : <RegisterForm />}
                </div>

                {/* Footer Link for better UX */}

              </Card.Body>
            </Card>
          </Col>

          {/* Right side PNG */}
          <Col xs={12} md={4} className="d-none d-md-block">
            <Image
              src={Wallpaper1}
              alt="Chef illustration"
              fluid
              className="w-100"
              style={{ filter: "drop-shadow(2px 6px 8px)" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
