import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  Container,
  Row,
  Card,
  Col,
  Button,
  Modal,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";
import "../../Styles/Menu.css"; // Use the new common CSS

const MenuItems = ({ selectedMenu }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loadingItem, setLoadingItem] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.foodName === item.foodName
    );

    if (!existingItem) {
      handleAddItem(item);
    }

    setShow(true);
  };

  const handleAddItem = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.foodName === item.foodName
    );

    if (existingItemIndex === -1) {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const handleAddWithSpinner = (item, index) => {
    setLoadingItem(index);

    setTimeout(() => {
      handleAddItem(item);
      setLoadingItem(null);
    }, 500);
  };

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
      console.log(key, order);
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Tasty Treats",
        description: "Test Transaction for Tasty Treats",
        image:
          "https://res.cloudinary.com/dtcgg2i4a/image/upload/v1726238690/avatars/o2xngaqekntoqks9vnlb.png",
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
    }
  };

  return (
    <Container className="pb-5">
      <Row className="g-4 justify-content-center">
        {selectedMenu.map((item, index) => (
          <Col lg={4} md={6} sm={12} key={index}>
            <Card className="menu-item-card h-100">
              <div className="text-center p-3 bg-light">
                <Card.Img
                  variant="top"
                  src={item.foodImage}
                  className="menu-item-img"
                  alt={item.foodName}
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold mb-2">{item.foodName}</Card.Title>
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                  <h5 className="text-primary-custom fw-bold mb-0">
                    &#8377;{item.foodPrice}
                  </h5>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-danger"
                      className="btn-outline-custom rounded-circle p-2"
                      onClick={() => handleShow(item)}
                      title="Order Now"
                    >
                      <i className="fas fa-shopping-bag"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-primary-custom rounded-circle p-2"
                      onClick={() => handleAddWithSpinner(item, index)}
                      disabled={loadingItem === index}
                      title="Add to Cart"
                    >
                      {loadingItem === index ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        <i className="fas fa-cart-plus text-white"></i>
                      )}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Order Summary */}
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
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle"
                        onClick={() => decreaseQuantity(index)}
                      >
                        -
                      </Button>
                      <span className="fw-bold mx-2">{item.quantity}</span>
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle"
                        onClick={() => increaseQuantity(index)}
                      >
                        +
                      </Button>
                      <div className="fw-bold ms-3" style={{ minWidth: '80px', textAlign: 'right' }}>
                        &#8377; {item.foodPrice * item.quantity}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <h5 className="mb-0">Total</h5>
                <h4 className="fw-bold text-primary-custom">&#8377; {totalPrice}</h4>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Your cart is empty.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-between">
          <Button variant="light" onClick={handleClose}>
            Continue Shopping
          </Button>
          {cartItems.length > 0 && (
            <Button className="btn-primary-custom px-5" onClick={handlePayment}>
              Checkout
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenuItems;
