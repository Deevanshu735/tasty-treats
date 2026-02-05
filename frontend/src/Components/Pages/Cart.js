import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } from "../../slices/cartSlice";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/Cart.css";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Quantity increased");
    };

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
        toast.success("Item removed");
    };

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear your cart?")) {
            dispatch(clearCart());
            toast.success("Cart cleared");
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <>
            <Navigation />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="cart-page-wrapper">
                <Container>
                    <div className="cart-header">
                        <h2 className="cart-title display-4">Your Shopping Bag</h2>
                        <p className="text-muted">
                            {cart.cartItems.length > 0
                                ? `${cart.cartItems.length} items waiting for you`
                                : "Is currently empty"}
                        </p>
                    </div>

                    {cart.cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="empty-cart-container"
                        >
                            <div className="empty-icon-wrapper">
                                <ShoppingBag size={48} />
                            </div>
                            <h4 className="mb-3 fw-bold">Your cart feels lonely</h4>
                            <p className="text-muted mb-4">
                                Explore our menu and add some delicious treats!
                            </p>
                            <Button
                                as={Link}
                                to="/menu"
                                variant="danger"
                                className="checkout-btn px-5 rounded-pill"
                            >
                                Start Exploring
                            </Button>
                        </motion.div>
                    ) : (
                        <Row className="g-5">
                            <Col lg={8}>
                                <AnimatePresence>
                                    {cart.cartItems.map((cartItem) => (
                                        <motion.div
                                            key={cartItem.foodId}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            className="cart-card p-3"
                                        >
                                            <Row className="align-items-center cart-item-row">
                                                <Col md={3}>
                                                    <Image
                                                        src={cartItem.foodImage}
                                                        alt={cartItem.foodName}
                                                        className="cart-item-img shadow-sm"
                                                        fluid
                                                    />
                                                </Col>
                                                <Col md={4} className="text-center text-md-start">
                                                    <h5 className="cart-item-title mb-1">{cartItem.foodName}</h5>
                                                    <p className="cart-item-price mb-0">
                                                        &#8377;{cartItem.foodPrice}
                                                    </p>
                                                </Col>
                                                <Col md={3} className="text-center">
                                                    <div className="quantity-pill mx-auto mx-md-0">
                                                        <button
                                                            className="qty-btn"
                                                            onClick={() => handleDecreaseCart(cartItem)}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="qty-value">{cartItem.cartQuantity}</span>
                                                        <button
                                                            className="qty-btn"
                                                            onClick={() => handleAddToCart(cartItem)}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col md={2} className="text-center text-md-end mt-3 mt-md-0 cart-actions">
                                                    <div className="d-flex flex-column align-items-center align-items-md-end gap-2">
                                                        <span className="fw-bold fs-5">
                                                            &#8377;{cartItem.foodPrice * cartItem.cartQuantity}
                                                        </span>
                                                        <Button
                                                            variant="link"
                                                            className="text-danger p-0 text-decoration-none small d-flex align-items-center gap-1"
                                                            onClick={() => handleRemoveFromCart(cartItem)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button
                                        variant="link"
                                        as={Link}
                                        to="/menu"
                                        className="text-decoration-none text-secondary fw-bold d-flex align-items-center gap-2"
                                    >
                                        <ArrowLeft size={18} /> Continue Shopping
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="rounded-pill px-4"
                                        onClick={handleClearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div className="summary-card p-4">
                                    <h4 className="fw-bold mb-4">Order Summary</h4>
                                    <div className="d-flex justify-content-between mb-3 text-secondary">
                                        <span>Subtotal</span>
                                        <span className="fw-bold text-dark">
                                            &#8377;{cart.cartTotalAmount}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 text-secondary">
                                        <span>Delivery Fee</span>
                                        <span className="text-success fw-bold">Free</span>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between mb-4">
                                        <h4 className="fw-bold">Total</h4>
                                        <h4 className="fw-bold text-primary">
                                            &#8377;{cart.cartTotalAmount}
                                        </h4>
                                    </div>
                                    <Button
                                        className="checkout-btn w-100 py-3 text-white"
                                        onClick={handleCheckout}
                                    >
                                        PROCEED TO CHECKOUT
                                    </Button>
                                    <p className="text-center text-muted small mt-3">
                                        Secure Checkout powered by Razorpay
                                    </p>
                                </div>
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
