import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_BASE_URL } from "../../constant";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import { clearCart } from "../../slices/cartSlice";
import { MapPin, User, Mail, Phone, CreditCard } from "lucide-react";
import TrustBadges from "../Resuable/TrustBadges";

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
        const toastId = toast.loading('Initiating secure payment...');
        try {
            console.log("Fetching payment key...");
            const { data: { key } } = await axios.get(`${BACKEND_BASE_URL}/api/payments/getkey`);

            console.log("Creating order...");
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
                modal: {
                    ondismiss: function () {
                        toast.dismiss(toastId);
                        toast.error("Payment cancelled");
                    }
                },
                handler: function (response) {
                    toast.dismiss(toastId);
                    toast.success("Payment Successful!");
                    dispatch(clearCart());
                    // window.location.href = ... (backend redirects)
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error("Payment Error: ", err);
            toast.dismiss(toastId);
            toast.error("Payment failed. Please try again.");
        }
    };

    return (
        <>
            <Navigation />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="checkout-page min-vh-100 py-5" style={{ paddingTop: "120px", backgroundColor: "#f8f9fa" }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5">Checkout</h2>
                        <p className="text-muted">Complete your order securely</p>
                    </div>

                    <Row className="g-5">
                        <Col lg={7}>
                            <Card className="border-0 shadow-sm rounded-4 mb-4">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <div className="bg-danger bg-opacity-10 p-2 rounded-circle text-danger">
                                            <MapPin size={24} />
                                        </div>
                                        <h4 className="fw-bold mb-0">Shipping Address</h4>
                                    </div>

                                    <Form>
                                        <Row className="g-3">
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="fw-medium text-secondary">Street Address</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="street"
                                                        value={address.street}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="123 Main St, Apartment 4B"
                                                        className="py-2 bg-light border-0"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-medium text-secondary">City</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="city"
                                                        value={address.city}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="New York"
                                                        className="py-2 bg-light border-0"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="fw-medium text-secondary">Zip Code</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="zip"
                                                        value={address.zip}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="10001"
                                                        className="py-2 bg-light border-0"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 shadow-sm rounded-4 mb-4">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center gap-2 mb-4">
                                        <div className="bg-danger bg-opacity-10 p-2 rounded-circle text-danger">
                                            <User size={24} />
                                        </div>
                                        <h4 className="fw-bold mb-0">Contact Info</h4>
                                    </div>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text className="bg-light border-0 text-muted"><User size={18} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Full Name"
                                                    value={user?.name || ""}
                                                    disabled
                                                    className="bg-light border-0"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md={6}>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text className="bg-light border-0 text-muted"><Mail size={18} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder="Email"
                                                    value={user?.email || ""}
                                                    disabled
                                                    className="bg-light border-0"
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={5}>
                            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                                <div className="bg-light p-4 border-bottom">
                                    <h5 className="fw-bold mb-0">Order Summary</h5>
                                </div>
                                <Card.Body className="p-4">
                                    <ListGroup variant="flush" className="mb-4">
                                        {cart.cartItems.map(item => (
                                            <ListGroup.Item key={item.foodId} className="d-flex justify-content-between align-items-center px-0 border-bottom py-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="bg-light rounded p-1" style={{ width: '50px', height: '50px' }}>
                                                        <img src={item.foodImage} alt={item.foodName} className="w-100 h-100 object-fit-contain" />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 fw-bold">{item.foodName}</h6>
                                                        <small className="text-muted">Qty: {item.cartQuantity}</small>
                                                    </div>
                                                </div>
                                                <span className="fw-bold">&#8377;{item.foodPrice * item.cartQuantity}</span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    <div className="d-flex justify-content-between mb-2 text-secondary">
                                        <span>Subtotal</span>
                                        <span>&#8377;{cart.cartTotalAmount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 text-secondary">
                                        <span>Shipping</span>
                                        <span className="text-success fw-bold">Free</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 pt-3 border-top">
                                        <h4 className="fw-bold">Total</h4>
                                        <h4 className="fw-bold text-primary-custom">&#8377;{cart.cartTotalAmount}</h4>
                                    </div>

                                    <Button
                                        className="w-100 btn-primary-custom py-3 rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2"
                                        onClick={handlePayment}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        <CreditCard size={20} /> Pay Now
                                    </Button>

                                    <TrustBadges />
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
