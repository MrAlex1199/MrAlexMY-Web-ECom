import React, { useState, useEffect } from 'react';
import './Styles/App.css';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminManageProducts from './pages/AdminManageProducts';
import AdminManageOrders from './pages/AdminManageOrders';
import AdminManageCustomrs from './pages/AdminManageCustomers';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [userData, setUserData] = useState({ fname: '', lname: '', userId: '' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [adminData, setAdminData] = useState({ adminid: '', email: '', role: '' });
  
  // Conditional rendering for Navbar based on route
  const shouldShowNavbar = ![
    '/login',
    '/register',
    '/CheckoutPage',
    '/admin-register',
    '/admin-register',
    '/AdminDashboard',
    '/AdminManageProducts',
    '/AdminManageOrders',
    '/AdminManageCustomrs',
    '/admin-login'
  ].includes(window.location.pathname);

  const shouldShowFooter = ![
    '/AdminDashboard',
    '/AdminManageProducts',
    '/AdminManageOrders',
    '/AdminManageCustomrs',
    '/admin-register',
    '/admin-login'
  ].includes(window.location.pathname);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const Atoken = localStorage.getItem('AToken');
      console.log('Retrieved token from localStorage:', Atoken);
      if (!Atoken) {
        console.warn('No token found, redirecting to login');
        setIsAdmin(false); // Explicitly set to false
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/admin', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        if (data.success) {
          setAdminData({
            adminid: data.adminId,
            email: data.email,
            role: data.role,
          });
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true'); // Persist admin status
        } else {
          console.error('Failed to retrieve admin data:', data.message || 'Unknown error');
          setIsAdmin(false);
          localStorage.removeItem('isAdmin'); // Remove admin status if invalid
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
      }
    };
    fetchAdminDetails();
  }, []);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }

          const data = await response.json();
          if (data.success) {
            setUserData({
              userId: data.userId,
              email: data.email,
              fname: data.fname, 
              lname: data.lname
            });
            setIsLoggedIn(true);
          } else {
            console.error('Failed to retrieve user data');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      if (userData.userId) {
        try {
          const response = await fetch(`http://localhost:3001/cart/${userData.userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch selected products');
          }

          const data = await response.json();
          setSelectedProducts(data.selectedProducts || []); // Handle empty cart

          const updatedTotalPrice = data.selectedProducts.reduce(
            (acc, product) => acc + product.totalPrice,
            0.00
          );
          setTotalPrice(updatedTotalPrice.toFixed(2));
        } catch (error) {
          console.error('Error fetching selected products:', error);
        }
      }
    };

    fetchSelectedProducts();
  }, [userData.userId]);
  

  return (
    <Router>
      {shouldShowNavbar && <Navbar isLoggedIn={isLoggedIn} userData={userData} selectedProducts={selectedProducts} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/setting" element={<Setting  userData={userData} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProdutsDetails userId={userData.userId} />} />
        <Route path="/cart" element={ 
          <Cart 
            userId={userData.userId}
            selectedProducts={selectedProducts}
            totalPrice={totalPrice}
            setSelectedProducts={setSelectedProducts}
            setTotalPrice={setTotalPrice}
        /> }/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} setAdminData={setAdminData} />} />
        <Route path="/AdminDashboard" element={<ProtectedRoute isAdmin={isAdmin}><AdminDashboard adminData={adminData} /></ProtectedRoute>} />
        <Route path="/AdminManageProducts" element={<ProtectedRoute isAdmin={isAdmin}><AdminManageProducts adminData={adminData} /></ProtectedRoute>} />
        <Route path="/AdminManageOrders" element={<ProtectedRoute isAdmin={isAdmin}><AdminManageOrders adminData={adminData} /></ProtectedRoute>} />
        <Route path="/AdminManageCustomrs" element={<ProtectedRoute isAdmin={isAdmin}><AdminManageCustomrs adminData={adminData} /></ProtectedRoute>} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </Router>
  );
}