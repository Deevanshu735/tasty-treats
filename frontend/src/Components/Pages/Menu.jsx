import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Navigation } from "../Resuable/Navigation";
import { Link } from "react-router-dom";
import Footer from "../Resuable/Footer";
import MenuItems from "./MenuItems";
import "../../Styles/Menu.css";
// import { categories, foodItems } from "../../menubar/menuData";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);
  const [categories, setCategories] = useState([]);

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
      try {
        // Fetch all items and filter (or ideally fetch by category if API supports it)
        // Based on ManageMenu.jsx, it seems we might need to fetch all and filter client-side
        // or maybe there is an endpoint. Let's assume we fetch all for now like ManageMenu.jsx did?
        // ManageMenu.jsx: const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        // data = menuData.filter((item) => item.foodCategory === selectedMenu);

        const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        const allItems = response.data.data; // API usually returns { data: [...] } or just [...]?
        // In ManageMenu.jsx line 50: setMenuData(response.data); -> It seems response.data IS the array?
        // Let's look at ManageMenu.jsx again.
        // StartLine: 49: const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        // StartLine: 50: setMenuData(response.data);
        // StartLine: 59: const data = menuData.filter((item) => item.foodCategory === selectedMenu);

        // Wait, looking at ManageMenu.jsx again.
        // It uses response.data.

        const filtered = response.data.filter((item) => item.foodCategory === selectedMenu);
        setSelectedMenuItem(filtered);

      } catch (error) {
        console.error("Error fetching menu items:", error);
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

          {selectedMenuItem && <MenuItems selectedMenu={selectedMenuItem} />}
        </Container>
      </div>
      <Footer />
    </>
  );
}
