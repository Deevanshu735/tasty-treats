import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
// import cart actions here when we find them, for now just a placeholder function or props
// assuming cartSlice exists based on Navigation.js
// import { addToCart } from "../../slices/cartSlice"; 

import "../../Styles/FoodCard.css";

const FoodCard = ({ item }) => {
    const { Image, Name, Reg, Med, desc, rating } = item;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // dispatch(addToCart({ ...item, price: Reg })); // Example dispatch
        console.log("Added to cart:", Name);
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="food-card border-0 h-100 shadow-sm">
                <div className="card-img-wrapper">
                    <Card.Img variant="top" src={Image} className="food-img" />
                    <Badge bg="warning" className="rating-badge">
                        <Star size={12} fill="white" stroke="none" className="me-1" />
                        {rating || 4.5}
                    </Badge>
                </div>
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="food-title">{Name}</Card.Title>
                    <Card.Text className="text-muted small flex-grow-1">
                        {desc || "Delicious cheesy goodness with fresh toppings."}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h5 className="price mb-0 text-primary-custom">{Reg}</h5>
                        <Button
                            className="btn-add-cart rounded-circle p-2"
                            variant="light"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={20} className="text-primary-custom" />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default FoodCard;
