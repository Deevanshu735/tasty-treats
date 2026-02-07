import React, { useEffect, useState } from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import { Navigation } from "../Resuable/Navigation";
import { Link } from "react-router-dom";
import Footer from "../Resuable/Footer";
import MenuItems from "./MenuItems";
import SkeletonCard from "../Resuable/SkeletonCard";
import "../../Styles/Menu.css";
// import { categories, foodItems } from "../../menubar/menuData";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodCategory = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/api/foods/getfoodcategory`
        );
        setCategories(response.data.categories);
        // Set the first category as selected initially if available
        if (response.data.categories && response.data.categories.length > 0) {
          setSelectedMenu(response.data.categories[0].foodId);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getFoodCategory();
  }, []);

  useEffect(() => {
    const getFoodItems = async () => {
      if (!selectedMenu) return; // Don't fetch if no category is selected
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        const filtered = response.data.filter((item) => item.foodCategory === selectedMenu);
        setSelectedMenuItem(filtered);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };
    getFoodItems();
  }, [selectedMenu]);

  return (
    <>
      <Navigation />
      <div className="menu-page-wrapper">
        <Container fluid>
          <div className="text-center py-5">
            <h5 className="text-primary-custom text-uppercase fw-bold letter-spacing-2">Discover</h5>
            <h2 className="display-4 fw-bold mb-4">Our Tasty Menu</h2>
          </div>

          <Nav className="justify-content-center mb-5 category-nav">
            <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-3">
              {categories.map((item) => (
                <li
                  key={item.foodId}
                  className={`category-item ${selectedMenu === item.foodId ? "active" : ""}`}
                  onClick={() => setSelectedMenu(item.foodId)}
                >
                  {item.foodCategory}
                </li>
              ))}
            </ul>
          </Nav>

          <Container className="pb-5">
            <Row className="g-4 justify-content-center">
              {loading ? (
                // Show 8 skeletons while loading
                Array.from({ length: 8 }).map((_, idx) => (
                  <Col lg={3} md={4} sm={6} key={idx}>
                    <SkeletonCard />
                  </Col>
                ))
              ) : (
                <MenuItems selectedMenu={selectedMenuItem} />
              )}
            </Row>
          </Container>
        </Container>
      </div>
      <Footer />
    </>
  );
}
