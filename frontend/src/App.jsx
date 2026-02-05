import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Components/Pages/Home";
// import About from "./Components/Pages/About";
import Menu from "./Components/Pages/Menu";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Login/Login";
import Reservation from "./Components/Pages/Reservation";
import Cart from "./Components/Pages/Cart";
import Checkout from "./Components/Pages/Checkout";
import PaymentSuccess from "./Components/Pages/PaymentSuccess";
import NotFound from "./Components/Resuable/NotFound";
import Admin from "./Components/Admin/Admin";
// import Profile from "./Components/Pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
