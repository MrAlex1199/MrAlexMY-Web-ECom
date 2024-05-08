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
  const [userData, setUserData] = useState({ fname: '', lname: '', userId: '',});
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData({ 
            fname: data.fname,
            lname: data.lname,
            userId: data.userId 
          });
          setIsLoggedIn(true);
        } else {
          console.error('Failed to fetch user details');
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, []);

  const shouldShowNavbar = !['/login', '/register'].includes(window.location.pathname);
  
  console.log(userData);
  
  return (
    <Router>
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} userData={userData} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProdutsDetails userId={userData.userId} />} />
        <Route path="/cart" element={<Cart userId={userData.userId} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
