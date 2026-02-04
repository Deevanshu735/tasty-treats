import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import "../../Styles/Footer.css"; // We will create this

export default function Footer() {
  return (
    <footer className="footer pt-5">
      <Container>
        <Row className="pb-5 justify-content-between">
          <Col lg={4} md={6} sm={12} className="mb-4 pe-lg-5">
            <h2 className="footer-logo mb-4 d-flex align-items-center gap-2">
              <span className="text-primary-custom">Tasty</span>Treats
            </h2>
            <p className="text-muted small lh-lg">
              Tasty Treats is your go-to destination for delicious meals delivered fast. We promise quality, taste, and speed right to your doorstep.
            </p>
            <div className="d-flex gap-3 mt-4">
              {/* Social Icons with individual hover colors could be nice, but consistent brand color is better for premium feel */}
              <div className="social-icon"><Facebook size={20} /></div>
              <div className="social-icon"><Twitter size={20} /></div>
              <div className="social-icon"><Instagram size={20} /></div>
              <div className="social-icon"><Linkedin size={20} /></div>
            </div>
          </Col>

          <Col lg={2} md={6} sm={6} className="mb-4">
            <h5 className="footer-title mb-4">Quick Links</h5>
            <ListGroup variant="flush" className="bg-transparent footer-links">
              <ListGroup.Item action href="#" className="bg-transparent border-0 ps-0 text-muted small">Home</ListGroup.Item>
              <ListGroup.Item action href="#menu" className="bg-transparent border-0 ps-0 text-muted small">Menu</ListGroup.Item>
              <ListGroup.Item action href="#about" className="bg-transparent border-0 ps-0 text-muted small">About Us</ListGroup.Item>
              <ListGroup.Item action href="#contact" className="bg-transparent border-0 ps-0 text-muted small">Contact</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={3} md={6} sm={6} className="mb-4">
            <h5 className="footer-title mb-4">Contact Info</h5>
            <ListGroup variant="flush" className="bg-transparent">
              <ListGroup.Item className="bg-transparent border-0 ps-0 text-muted small mb-3 d-flex gap-3">
                <MapPin size={20} className="text-primary-custom flex-shrink-0" />
                <span>Buria Chowk, Yamunanagar 133103</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 text-muted small mb-3 d-flex gap-3">
                <Phone size={20} className="text-primary-custom flex-shrink-0" />
                <span>+1 5589 55488 55</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 text-muted small d-flex gap-3">
                <Mail size={20} className="text-primary-custom flex-shrink-0" />
                <span>example@gmail.com</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col lg={3} md={6} sm={12} className="mb-4">
            <h5 className="footer-title mb-4">Newsletter</h5>
            <p className="text-muted small mb-3">Subscribe for latest updates & offers.</p>
            <div className="newsletter-box position-relative mt-3">
              <input type="email" placeholder="Email Address" className="form-control rounded-2 py-2 fs-6" />
              <button className="btn-newsletter position-absolute top-0 end-0 h-100 rounded-2 bg-primary-custom text-white border-0 px-3">
                <Send size={18} />
              </button>
            </div>
          </Col>
        </Row>

        <Row className="border-top border-secondary border-opacity-25 py-4 mt-2">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-muted small">
              &copy; 2024 <span className="text-primary-custom fw-bold">Tasty Treats</span>. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
            <div className="d-flex gap-4 justify-content-center justify-content-lg-end text-muted small">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
