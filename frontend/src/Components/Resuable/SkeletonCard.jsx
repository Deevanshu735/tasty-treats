import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import "../../Styles/FoodCard.css";

const SkeletonCard = () => {
    return (
        <Card className="food-card" aria-hidden="true">
            <div className="card-img-container bg-light d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                {/* Placeholder for image area */}
            </div>
            <Card.Body className="d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Placeholder as={Card.Title} animation="glow" className="w-75">
                        <Placeholder xs={10} />
                    </Placeholder>
                    <Placeholder as="span" animation="glow" className="w-25 text-end">
                        <Placeholder xs={8} />
                    </Placeholder>
                </div>

                <Placeholder as={Card.Text} animation="glow" className="mb-4 flex-grow-1">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>

                <Placeholder.Button variant="danger" xs={12} className="rounded-pill py-2" />
            </Card.Body>
        </Card>
    );
};

export default SkeletonCard;
