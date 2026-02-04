import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } from "../../slices/cartSlice";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import { motion } from "framer-motion";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth); // Get auth state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        if (auth.isLoggedIn) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Navigation />
            <div className="cart-container min-vh-100 py-8" style={{ paddingTop: "150px" }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5">Shopping Cart</h2>
                        <p className="text-secondary-custom">
                            {cart.cartItems.length > 0
                                ? `You have ${cart.cartItems.length} items in your cart`
                                : "Your cart is currently empty"}
                        </p>
                    </div>

                    {cart.cartItems.length === 0 ? (
                        <div className="text-center py-5">
                            <div className="mb-4">
                                <i className="fas fa-shopping-basket fa-4x text-muted opacity-25"></i>
                            </div>
                            <h4 className="mb-3 text-secondary-custom">No items added yet.</h4>
                            <Button as={Link} to="/menu" variant="danger" className="btn-primary-custom rounded-pill px-4">
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <Row>
                            <Col lg={8}>
                                <div className="table-responsive shadow-sm rounded-4 overflow-hidden bg-white mb-4">
                                    <Table className="mb-0 align-middle" hover>
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="py-3 ps-4 border-0">Product</th>
                                                <th className="py-3 border-0">Price</th>
                                                <th className="py-3 border-0">Quantity</th>
                                                <th className="py-3 border-0 text-end pe-4">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.cartItems.map((cartItem) => (
                                                <tr key={cartItem.foodId}>
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Image
                                                                src={cartItem.foodImage}
                                                                alt={cartItem.foodName}
                                                                rounded
                                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                            />
                                                            <div>
                                                                <h6 className="mb-0 fw-bold">{cartItem.foodName}</h6>
                                                                <Button
                                                                    variant="link"
                                                                    className="text-danger p-0 text-decoration-none small d-flex align-items-center gap-1 mt-1"
                                                                    onClick={() => handleRemoveFromCart(cartItem)}
                                                                >
                                                                    <Trash2 size={14} /> Remove
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-secondary-custom">&#8377;{cartItem.foodPrice}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center border rounded-pill px-2" style={{ width: "fit-content" }}>
                                                            <Button
                                                                variant="link"
                                                                className="text-dark p-1"
                                                                onClick={() => handleDecreaseCart(cartItem)}
                                                            >
                                                                <Minus size={14} />
                                                            </Button>
                                                            <span className="mx-2 fw-bold small">{cartItem.cartQuantity}</span>
                                                            <Button
                                                                variant="link"
                                                                className="text-dark p-1"
                                                                onClick={() => handleAddToCart(cartItem)}
                                                            >
                                                                <Plus size={14} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className="text-end pe-4 fw-bold">&#8377;{cartItem.foodPrice * cartItem.cartQuantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <Button variant="outline-dark" as={Link} to="/menu" className="rounded-pill px-4 btn-sm d-flex align-items-center gap-2">
                                        <ArrowLeft size={16} /> Continue Shopping
                                    </Button>
                                    <Button variant="outline-danger" className="rounded-pill px-4 btn-sm" onClick={handleClearCart}>
                                        Clear Cart
                                    </Button>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <Card className="border-0 shadow-sm rounded-4 bg-light">
                                    <Card.Body className="p-4">
                                        <h5 className="fw-bold mb-4">Order Summary</h5>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-secondary-custom">Subtotal</span>
                                            <span className="fw-bold">&#8377;{cart.cartTotalAmount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                                            <span className="text-secondary-custom">Delivery</span>
                                            <span className="text-success fw-bold">Free</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="fw-bold">Total</h5>
                                            <h5 className="fw-bold text-primary-custom">&#8377;{cart.cartTotalAmount}</h5>
                                        </div>
                                        <Button
                                            className="w-100 btn-primary-custom py-3 rounded-pill fw-bold"
                                            onClick={handleCheckout}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
