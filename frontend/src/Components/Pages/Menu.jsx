import React, { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Navigation } from "../Resuable/Navigation";
import { Link } from "react-router-dom";
import Footer from "../Resuable/Footer";
import MenuItems from "./MenuItems";
import "../../Styles/Menu.css";
import { categories, foodItems } from "../../menubar/menuData";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = React.useState(categories[0].foodId);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState([]);

  useEffect(() => {
    // Filter mock data directly
    const data = foodItems.filter((item) => {
      return item.foodCategory === selectedMenu;
    });
    setSelectedMenuItem(data);
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

          {selectedMenuItem && <MenuItems selectedMenu={selectedMenuItem} />}
        </Container>
      </div>
      <Footer />
    </>
  );
}
