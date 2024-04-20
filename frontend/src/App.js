import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import ProdutsDetails from "./pages/ProdutsDetails";
import Cart from "./pages/cart";
import Setting from "./pages/SettingUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a valid JWT is stored in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProdutsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}
