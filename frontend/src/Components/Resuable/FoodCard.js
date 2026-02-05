import React from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import toast from 'react-hot-toast';

import "../../Styles/FoodCard.css";

const FoodCard = ({ item }) => {
    const { foodImage, foodName, foodPrice, foodDesc } = item;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        toast.success(`${foodName} added to cart`);
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className="food-card">
                <div className="card-img-container">
                    <Card.Img variant="top" src={foodImage} className="food-img" loading="lazy" />
                    <div className="card-overlay">
                        <Button
                            className="btn-quick-view rounded-pill px-4"
                            variant="light"
                        >
                            Quick View
                        </Button>
                    </div>
                </div>
                <Card.Body className="d-flex flex-column p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="food-title h5 mb-0 text-truncate" title={foodName}>
                            {foodName}
                        </Card.Title>
                        <span className="food-price-badge">&#8377;{foodPrice}</span>
                    </div>

                    <Card.Text className="food-desc text-gray small mb-4 flex-grow-1">
                        {foodDesc || "Delicious cheesy goodness with fresh toppings."}
                    </Card.Text>

                    <Button
                        className="btn-add-cart w-100 rounded-pill py-2 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag size={18} /> Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default FoodCard;
