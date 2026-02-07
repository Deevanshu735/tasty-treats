import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Image, ProgressBar, Collapse, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } from "../../slices/cartSlice";
import { Navigation } from "../Resuable/Navigation";
import Footer from "../Resuable/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Truck, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/Cart.css";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openNote, setOpenNote] = useState(false);
    const [chefNote, setChefNote] = useState("");

    const FREE_DELIVERY_THRESHOLD = 500;
    const progress = Math.min((cart.cartTotalAmount / FREE_DELIVERY_THRESHOLD) * 100, 100);
    const remainingForFreeDelivery = FREE_DELIVERY_THRESHOLD - cart.cartTotalAmount;

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
        // You generally want to pass the chefNote to checkout or store it in redux/context
        // For now, we'll just navigate
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
                                {/* Free Delivery Progress */}
                                <div className="mb-4 p-3 bg-white rounded-4 shadow-sm">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Truck size={20} className="text-primary-custom" />
                                        {remainingForFreeDelivery > 0 ? (
                                            <span className="fw-medium text-secondary">
                                                Add <span className="text-dark fw-bold">&#8377;{remainingForFreeDelivery}</span> more for <span className="text-success fw-bold">Free Delivery</span>
                                            </span>
                                        ) : (
                                            <span className="fw-bold text-success">You've unlocked Free Delivery!</span>
                                        )}
                                    </div>
                                    <ProgressBar
                                        now={progress}
                                        variant={remainingForFreeDelivery <= 0 ? "success" : "danger"}
                                        className="rounded-pill"
                                        style={{ height: "8px" }}
                                    />
                                </div>

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

                                {/* Note to Chef */}
                                <div className="mt-4">
                                    <Button
                                        variant="link"
                                        className="text-decoration-none text-secondary d-flex align-items-center gap-2 p-0 mb-2"
                                        onClick={() => setOpenNote(!openNote)}
                                        aria-controls="chef-note-collapse"
                                        aria-expanded={openNote}
                                    >
                                        <MessageSquare size={18} /> Add a note for the chef
                                    </Button>
                                    <Collapse in={openNote}>
                                        <div id="chef-note-collapse">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Allergies? Extra spicy? Let us know!"
                                                value={chefNote}
                                                onChange={(e) => setChefNote(e.target.value)}
                                                className="shadow-none border-secondary-subtle"
                                            />
                                        </div>
                                    </Collapse>
                                </div>

                                <div className="d-flex justify-content-between mt-5">
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
                                        {cart.cartTotalAmount >= FREE_DELIVERY_THRESHOLD ? (
                                            <span className="text-success fw-bold">Free</span>
                                        ) : (
                                            <span className="text-dark fw-bold">&#8377;40</span>
                                        )}
                                    </div>
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between mb-4">
                                        <h4 className="fw-bold">Total</h4>
                                        <h4 className="fw-bold text-primary-custom">
                                            &#8377;{cart.cartTotalAmount + (cart.cartTotalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : 40)}
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
