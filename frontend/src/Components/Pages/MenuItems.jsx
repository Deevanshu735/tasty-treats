import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";
import "../../Styles/Menu.css";
import toast from 'react-hot-toast';
import FoodCard from "../Resuable/FoodCard";

const MenuItems = ({ selectedMenu }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Cleaned up unused state: loadingItem

  const handleClose = () => setShow(false);

  // Note: FoodCard handles adding to cart directly now. 
  // We keep the modal logic for the "Order Summary" if needed, 
  // but the Quick View button on card isn't wired yet.
  // For now, let's keep the cartItems state logic for the Modal 
  // in case we need it, but FoodCard works independently for adding.

  // Since FoodCard handles adding, we might not need handleAddItem here 
  // unless we wire up the Quick View -> Modal flow.
  // For now, let's leave the modal logic as 'dormant' or potential future use,
  // and focus on rendering the FoodCards.

  const increaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.foodPrice * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(`${BACKEND_BASE_URL}/api/payments/getkey`);
      const {
        data: { order },
      } = await axios.post(`${BACKEND_BASE_URL}/api/payments/checkout`, {
        totalPrice,
      });

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Tasty Treats",
        description: "Test Transaction for Tasty Treats",
        image: "https://res.cloudinary.com/dtcgg2i4a/image/upload/v1726238690/avatars/o2xngaqekntoqks9vnlb.png",
        order_id: order.id,
        callback_url: `${BACKEND_BASE_URL}/api/payments/paymentverification`,
        prefill: {
          name: "",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#DC3545",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    }
  };

  return (
    <Container className="pb-5">
      <Row className="g-4 justify-content-center">
        {selectedMenu.map((item, index) => (
          <Col lg={3} md={4} sm={6} key={item.foodId || index}>
            <FoodCard item={item} />
          </Col>
        ))}
      </Row>

      {/* Modal for Order Summary - Optional/Legacy but kept for code structure if needed */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <div className="p-3">
              <h6 className="item-header mb-3">Your Items</h6>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.foodImage} alt={item.foodName} style={{ width: '60px', height: '60px', objectFit: 'contain' }} className="rounded" />
                      <div>
                        <h6 className="mb-0 fw-bold">{item.foodName}</h6>
                        <small className="text-muted">&#8377;{item.foodPrice} x {item.quantity}</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {/* Quantity controls code ... */}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {/* Total Price ... */}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Your cart is empty.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenuItems;
