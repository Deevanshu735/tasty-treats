import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu as MenuIcon, X } from "lucide-react"; // Modern Icons
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import "../../Styles/Navigation.css";

export function Navigation() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { cartTotalQuantity } = useSelector((state) => state.cart);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle Scroll Effect for Glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo cursive-font">
          Tasty Treats
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-3 gap-3">
          {/* Mobile Toggle */}
          <button
            className="mobile-toggle d-lg-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="icon-wrapper text-decoration-none">
            <ShoppingCart size={24} className="nav-icon" />
            <Badge bg="danger" pill className="cart-badge">{cartItems.length}</Badge>
          </Link>

          {/* User Profile (Desktop) */}
          <div className="d-none d-lg-block">
            {isLoggedIn ? (
              <div className="user-menu">
                <button onClick={handleLogout} className="btn-logout">Logout</button>
                <User size={24} className="nav-icon ms-2" />
              </div>
            ) : (
              <Link to="/login" className="btn-login">Login</Link>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <Navbar.Collapse id="navbarScroll" className="justify-content-center d-none d-lg-flex">
          <Nav className="nav-links">
            {navLinks.map((link) => (
              <Nav.Link
                as={Link}
                to={link.path}
                key={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu-overlay d-lg-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Container className="d-flex flex-column align-items-center pt-5">
                {navLinks.map((link) => (
                  <Link
                    to={link.path}
                    key={link.path}
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4">
                  {isLoggedIn ? (
                    <button onClick={() => { handleLogout(); setIsOpen(false) }} className="btn-logout">Logout</button>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-login">Login</Link>
                  )}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </Navbar>
  );
}
