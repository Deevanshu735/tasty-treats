import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import "../../Styles/Contact.css"; // Create this next

export default function Contact() {
  return (
    <>
      <Navigation />
      <div className="contact-page-wrapper">
        <Container>
          <div className="text-center mb-5">
            <h5 className="text-primary-custom text-uppercase fw-bold letter-spacing-2">Get in Touch</h5>
            <h2 className="display-4 fw-bold">Contact Us</h2>
          </div>

          <Row className="g-5">
            {/* Left Side: Info & Map */}
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="h-100 d-flex flex-column gap-4"
              >
                <div className="contact-info-card p-4 rounded-4 bg-white shadow-sm">
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="icon-circle bg-light text-primary-custom p-3 rounded-circle">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Our Location</h5>
                      <p className="text-muted mb-0">Buria Chowk, Yamunanagar 133103, Haryana, India</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div className="icon-circle bg-light text-primary-custom p-3 rounded-circle">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Phone Number</h5>
                      <p className="text-muted mb-0">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <div className="icon-circle bg-light text-primary-custom p-3 rounded-circle">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">Email Address</h5>
                      <p className="text-muted mb-0">hello@tastytreats.com</p>
                    </div>
                  </div>
                </div>

                <div className="map-container rounded-4 overflow-hidden shadow-sm flex-grow-1" style={{ minHeight: '300px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60897.103180352584!2d77.19052092828481!3d30.175971775771007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390efbee3dc0d0eb%3A0xf105c50233e747d2!2sJagadhri%2C%20Haryana!5e1!3m2!1sen!2sin!4v1723620850215!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </motion.div>
            </Col>

            {/* Right Side: Form */}
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="contact-form-wrapper p-5 rounded-4 bg-white shadow-lg h-100"
              >
                <h3 className="fw-bold mb-4">Send us a Message</h3>
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Control type="text" placeholder="Your Name" className="mod-input" />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Control type="email" placeholder="Your Email" className="mod-input" />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Subject" className="mod-input" />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control as="textarea" rows={5} placeholder="Message" className="mod-input" />
                  </Form.Group>
                  <Button variant="danger" className="btn-primary-custom w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                    Send Message <Send size={18} />
                  </Button>
                </Form>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
