import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { BACKEND_BASE_URL } from "../../constant";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import { clearCart } from "../../slices/cartSlice";

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        street: "",
        city: "",
        zip: "",
        country: "India"
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            const { data: { key } } = await axios.get(`${BACKEND_BASE_URL}/api/payments/getkey`);
            const { data: { order } } = await axios.post(`${BACKEND_BASE_URL}/api/payments/checkout`, {
                totalPrice: cart.cartTotalAmount,
            });

            const options = {
                key: key,
                amount: order.amount,
                currency: "INR",
                name: "Tasty Treats",
                description: "Food Order",
                image: "https://res.cloudinary.com/dtcgg2i4a/image/upload/v1726238690/avatars/o2xngaqekntoqks9vnlb.png",
                order_id: order.id,
                callback_url: `${BACKEND_BASE_URL}/api/payments/paymentverification`,
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: user?.phone || ""
                },
                theme: {
                    color: "#e23744",
                },
                handler: function (response) {
                    // This handler is for client-side success handling if not using callback_url redirect
                    // But since we use callback_url, backend handles redirection.
                    // On success redirection, we should clear cart?
                    // Usually clearing cart happens on the success page or after successful webhook.
                    // For simplicity, we can let the success page handle it or clear it here if using handler.
                    dispatch(clearCart());
                    // window.location.href = ... (backend redirects)
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error("Payment Error: ", err);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <>
            <Navigation />
            <div className="checkout-page min-vh-100 py-5" style={{ paddingTop: "100px" }}>
                <Container>
                    <h2 className="fw-bold mb-5 text-center">Checkout</h2>
                    <Row>
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm rounded-4 mb-4">
                                <Card.Body className="p-4">
                                    <h4 className="fw-bold mb-4">Shipping Address</h4>
                                    <Form>
                                        <Row>
                                            <Col md={12} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Street Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="street"
                                                        value={address.street}
                                                        onChange={handleChange}
                                                        required
                                                        className="py-2"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="city"
                                                        value={address.city}
                                                        onChange={handleChange}
                                                        required
                                                        className="py-2"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="zip"
                                                        value={address.zip}
                                                        onChange={handleChange}
                                                        required
                                                        className="py-2"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="border-0 shadow-sm rounded-4 bg-light">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4">Order Summary</h5>
                                    <ListGroup variant="flush" className="mb-4 bg-transparent">
                                        {cart.cartItems.map(item => (
                                            <ListGroup.Item key={item.foodId} className="d-flex justify-content-between align-items-center bg-transparent px-0 border-bottom">
                                                <span>{item.foodName} <small className="text-muted">x{item.cartQuantity}</small></span>
                                                <span className="fw-bold">&#8377;{item.foodPrice * item.cartQuantity}</span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="fw-bold">Total</h5>
                                        <h5 className="fw-bold text-primary-custom">&#8377;{cart.cartTotalAmount}</h5>
                                    </div>
                                    <Button
                                        className="w-100 btn-primary-custom py-3 rounded-pill fw-bold"
                                        onClick={handlePayment}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Pay Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
