import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Calendar, Clock, Users, MessageSquare, CheckCircle } from "lucide-react"; // Icons
import { motion } from "framer-motion";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../constant";
import "../../Styles/Contact.css"; // Reusing contact styles for consistency, or create new Reservation.css if needed

export default function Reservation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/reservations/reserve`, formData);
      alert("Reservation Successful! We'll contact you soon.");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="contact-page-wrapper" style={{ background: 'linear-gradient(to right, #fff5f5, #ffffff)' }}>
        <Container>
          <div className="text-center mb-5">
            <h5 className="text-primary-custom text-uppercase fw-bold letter-spacing-2">Book A Table</h5>
            <h2 className="display-4 fw-bold">Reservation</h2>
          </div>

          <Row className="g-0 rounded-4 overflow-hidden shadow-lg bg-white">
            {/* Left Side: Image/Banner */}
            <Col lg={5} className="d-none d-lg-block">
              <div
                className="h-100 w-100"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '600px'
                }}
              >
                <div className="h-100 w-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center text-white p-5 text-center">
                  <h3 className="cursive-font mb-3">Delicious Moments</h3>
                  <p>Reserve your spot for an unforgettable dining experience.</p>
                </div>
              </div>
            </Col>

            {/* Right Side: Form */}
            <Col lg={7}>
              <div className="p-5">
                <h3 className="fw-bold mb-4 text-primary-custom">Book Your Table</h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Name</Form.Label>
                      <Form.Control required name="name" onChange={handleChange} type="text" placeholder="John Doe" className="mod-input" />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Email</Form.Label>
                      <Form.Control required name="email" onChange={handleChange} type="email" placeholder="john@example.com" className="mod-input" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Phone</Form.Label>
                      <Form.Control required name="phone" onChange={handleChange} type="tel" placeholder="+91 98765..." className="mod-input" />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Guests</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0"><Users size={18} className="text-muted" /></span>
                        <Form.Control required name="people" onChange={handleChange} type="number" min="1" max="20" className="mod-input border-start-0 ps-0" placeholder="2 People" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Date</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0"><Calendar size={18} className="text-muted" /></span>
                        <Form.Control required name="date" onChange={handleChange} type="date" className="mod-input border-start-0 ps-0" />
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold text-muted">Time</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-end-0"><Clock size={18} className="text-muted" /></span>
                        <Form.Control required name="time" onChange={handleChange} type="time" className="mod-input border-start-0 ps-0" />
                      </div>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-muted">Special Request</Form.Label>
                    <Form.Control name="message" onChange={handleChange} as="textarea" rows={3} placeholder="Birthday, Anniversary, etc." className="mod-input" />
                  </Form.Group>

                  <Button
                    variant="danger"
                    type="submit"
                    disabled={loading}
                    className="btn-primary-custom w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  >
                    {loading ? 'Booking...' : 'Confirm Reservation'} <CheckCircle size={18} />
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}
