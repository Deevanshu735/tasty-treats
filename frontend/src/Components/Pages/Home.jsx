import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import FoodCard from "../Resuable/FoodCard";
// import { menuData } from "../../menubar/menuData";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";
import "../../Styles/Home.css";
import heroImg from "../../assests/images/pizzas1.png"; // Keeping original image asset for now
import { Clock, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  // Select top 4 items for popular section
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        // Assuming response.data is the array of items.
        // We'll take the first 4 items as "popular" for now, or use logic if API supports 'popular' flag.
        // Original code: const popularItems = menuData.slice(0, 4);
        if (Array.isArray(response.data)) {
          setPopularItems(response.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching popular items:", error);
      }
    };
    fetchPopularItems();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h6 className="text-primary-custom text-uppercase letter-spacing-2 mb-3 fw-bold">
                  Fastest Delivery
                </h6>
                <h1 className="display-3 fw-bold mb-4 landing-title">
                  Taste the <span className="text-primary-custom cursive-font">Magic</span> <br />
                  on your Tongue
                </h1>
                <p className="lead text-secondary mb-5">
                  Freshly made, delivered hot to your doorstep. Experience the best flavors in town with our premium ingredients.
                </p>
                <div className="d-flex gap-3">
                  <Button as={Link} to="/menu" className="btn-primary-custom d-flex align-items-center gap-2">
                    Order Now <ArrowRight size={20} />
                  </Button>
                  <Button as={Link} to="/reservation" variant="outline-dark" className="btn-outline-custom rounded-pill px-4 py-2">
                    Book a Table
                  </Button>
                </div>

                <div className="mt-5 d-flex gap-4">
                  <div className="d-flex align-items-center gap-2">
                    <div className="feature-icon-sm bg-light rounded-circle p-2">
                      <Truck size={20} className="text-primary-custom" />
                    </div>
                    <span className="fw-medium small">Free Delivery</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="feature-icon-sm bg-light rounded-circle p-2">
                      <ShieldCheck size={20} className="text-primary-custom" />
                    </div>
                    <span className="fw-medium small">100% Secure Checkout</span>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6} className="position-relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="hero-img-wrapper"
              >
                <img src={heroImg} alt="Delicious Pizza" className="img-fluid hero-img floating-animation" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h5 className="text-primary-custom text-uppercase fw-bold mb-2">What we serve</h5>
              <h2 className="fw-bold">Your Favorite Food <br /> Delivery Partner</h2>
            </Col>
          </Row>
          <Row>
            {[
              { title: "Easy To Order", icon: <Clock size={40} />, desc: "Order food at a single click. No hassle, just taste." },
              { title: "Fastest Delivery", icon: <Truck size={40} />, desc: "Delivery that is always on time, even faster." },
              { title: "Best Quality", icon: <ShieldCheck size={40} />, desc: "Not only fast, for us quality is also number one." }
            ].map((feature, idx) => (
              <Col lg={4} md={4} key={idx} className="mb-4">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="feature-card text-center p-4 rounded-4"
                >
                  <div className="icon-box mb-3 mx-auto text-primary-custom">
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="text-secondary">{feature.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Popular Menu Section */}
      <section className="popular-section">
        <Container>
          <Row className="mb-5 align-items-end">
            <Col>
              <h2 className="fw-bold">Popular Foods</h2>
            </Col>
            <Col className="text-end">
              <Link to="/menu" className="text-decoration-none text-primary-custom fw-bold">See All Foods</Link>
            </Col>
          </Row>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row>
              {popularItems.map((item, index) => (
                <Col lg={3} md={6} sm={12} key={index} className="mb-4">
                  <motion.div variants={itemVariants}>
                    <FoodCard item={item} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section bg-light-custom" style={{ backgroundColor: '#FFF5F5' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h5 className="text-primary-custom text-uppercase fw-bold">Testimonial</h5>
              <h2 className="fw-bold">What our customers are saying</h2>
              <p className="text-secondary">We are happy when our customers are happy.</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel indicators={false} controls={true} interval={3000} className="testimonial-carousel">
                {[
                  {
                    text: "The best food I have ever tasted! The delivery was super fast and the packaging was excellent. Highly recommended for everyone who loves quality food.",
                    name: "John Doe",
                    role: "Food Lover",
                    img: "https://randomuser.me/api/portraits/men/32.jpg"
                  },
                  {
                    text: "Simply delicious! The flavors were authentic and the portion sizes were generous. Will definitely order again.",
                    name: "Sarah Smith",
                    role: "Regular Customer",
                    img: "https://randomuser.me/api/portraits/women/44.jpg"
                  },
                  {
                    text: "Great service and even better food. The pizza was hot and fresh, just the way I like it. 5 stars!",
                    name: "Michael Brown",
                    role: "Pizza Enthusiast",
                    img: "https://randomuser.me/api/portraits/men/86.jpg"
                  }
                ].map((review, index) => (
                  <Carousel.Item key={index}>
                    <div className="text-center p-5 bg-white rounded-4 shadow-sm position-relative mx-3 my-2"> {/* Added margin for shadow visibility and safety */}
                      <div className="quote-icon text-primary-custom display-1 position-absolute top-0 start-0 ms-4 mt-2" style={{ opacity: 0.2 }}>❝</div>
                      <p className="lead fst-italic mb-4 mt-3">
                        "{review.text}"
                      </p>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <img src={review.img} alt={review.name} className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        <div className="text-start">
                          <h6 className="fw-bold mb-0">{review.name}</h6>
                          <small className="text-muted">{review.role}</small>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
