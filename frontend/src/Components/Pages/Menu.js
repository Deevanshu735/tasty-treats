import React, { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { Navigation } from "../Resuable/Navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Resuable/Footer";
import MenuItems from "./MenuItems";
import { BACKEND_BASE_URL } from "../../constant";
import "../../Styles/Menu.css"; // We will create this

export default function Menu() {
  const [menu, setMenu] = React.useState();
  const [menuError, setMenuError] = React.useState({});
  const [menuData, setMenuData] = React.useState([]);
  const [menuDataError, setMenuDataError] = React.useState({});

  const [selectedMenu, setSelectedMenu] = React.useState(1);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState([]);

  useEffect(() => {
    const getFoodCategory = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/getfoodcategory`);
        setMenu(response.data.categories);
        if (response.data.data.length > 0) {
          setSelectedMenu(1);
        }
      } catch (error) {
        setMenuError(error);
      }
    };
    getFoodCategory();
  }, []);

  useEffect(() => {
    const getFoodItems = async function () {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/foods/menu`);
        setMenuData(response.data);
      } catch (error) {
        setMenuDataError(error);
      }
    };
    getFoodItems();
  }, []);

  useEffect(() => {
    const data = menuData.filter((item, i) => {
      return item.foodCategory === selectedMenu;
    });
    setSelectedMenuItem(data);
  }, [menuData, selectedMenu]);

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
            {menu ? (
              <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-3">
                {menu.map((item, index) => (
                  <li
                    key={index}
                    className={`category-item ${selectedMenu === item.foodId ? "active" : ""}`}
                    onClick={() => setSelectedMenu(item.foodId)}
                  >
                    {item.foodCategory}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-danger">{menuError.message}</p>
            )}
          </Nav>

          {selectedMenuItem && <MenuItems selectedMenu={selectedMenuItem} />}
        </Container>
      </div>
      <Footer />
    </>
  );
}
