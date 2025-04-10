import React, { useState, useEffect } from "react";
import "./Styles/App.css";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Services from "./pages/Services";
import ProdutsDetails from "./pages/ProdutsDetails";
import ProductsFilter from "./pages/ProductsFilter";
import Cart from "./pages/cart";
import Setting from "./pages/SettingUser";
import Shipping from "./pages/Shipinglocation";
import Orderstatus from "./pages/Orderstatus";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminDashboard from "./pages/AdminPage/AdminDashboard";
import AdminRegister from "./pages/AdminPage/AdminRegister";
import AdminLogin from "./pages/AdminPage/AdminLogin";
import AdminManageProducts from "./pages/AdminPage/AdminProducts";
import AdminManageOrders from "./pages/AdminPage/AdminOrders";
import AdminManageCustomrs from "./pages/AdminPage/AdminCustomers";
import AdminPromotions from "./pages/AdminPage/AdminPromotions";
import AdminTeam from "./pages/AdminPage/AdminTeam";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("isAdmin") === "true"
  );
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    userId: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [adminData, setAdminData] = useState({
    adminid: "",
    email: "",
    role: "",
    Afname: "",
    Alname: "",
    phoneNumber: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Conditional rendering for Navbar based on route
  const shouldShowNavbar = ![
    "/login",
    "/register",
    "/CheckoutPage",
    "/Admin-Register",
    "/admin-register",
    "/Admin-Login",
    "/admin-login",
    "/AdminDashboard",
    "/admindashboard",
    "/AdminManageProducts",
    "/adminmanageproducts",
    "/AdminManageOrders",
    "/adminmanageorders",
    "/AdminManageCustomrs",
    "/adminmanagecustomrs",
    "/AdminPromotions",
    "/AdminTeam",
  ].includes(window.location.pathname);

  const shouldShowFooter = ![
    "/Admin-Register",
    "/admin-register",
    "/Admin-Login",
    "/admin-login",
    "/AdminDashboard",
    "/admindashboard",
    "/AdminManageProducts",
    "/adminmanageproducts",
    "/AdminManageOrders",
    "/adminmanageorders",
    "/AdminManageCustomrs",
    "/adminmanagecustomrs",
    "/AdminPromotions",
    "/AdminTeam",
  ].includes(window.location.pathname);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const Atoken = localStorage.getItem("AToken");
      // console.log('Retrieved token from localStorage:', Atoken);
      if (!Atoken) {
        // console.warn("No Admin token found, redirecting to login");
        setIsAdmin(false); // Explicitly set to false
        return;
      }
      try {
        const response = await fetch("http://localhost:3001/admin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Atoken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setAdminData({
            adminid: data.adminId,
            adminemail: data.Aemail,
            Afname: data.Afname,
            Alname: data.Alname,
            phoneNumber: data.phoneNumber,
            role: data.role,
          });
          setIsAdmin(true);
          localStorage.setItem("isAdmin", "true"); // Persist admin status
        } else {
          console.error(
            "Failed to retrieve admin data:",
            data.message || "Unknown error"
          );
          setIsAdmin(false);
          localStorage.removeItem("isAdmin"); // Remove admin status if invalid
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
      }
    };
    fetchAdminDetails();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:3001/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }

          const data = await response.json();
          if (data.success) {
            setUserData({
              userId: data.userId,
              email: data.email,
              fname: data.fname,
              lname: data.lname,
              address: data.address,
            });
            setIsLoggedIn(true);
          } else {
            console.error("Failed to retrieve user data");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      if (userData.userId) {
        try {
          const response = await fetch(
            `http://localhost:3001/cart/${userData.userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch selected products");
          }

          const data = await response.json();
          setSelectedProducts(data.selectedProducts || []); // Handle empty cart

          const updatedTotalPrice = data.selectedProducts.reduce(
            (acc, product) => acc + product.totalPrice,
            0.0
          );
          setTotalPrice(updatedTotalPrice.toFixed(2));
        } catch (error) {
          console.error("Error fetching selected products:", error);
        }
      }
    };

    fetchSelectedProducts();
  }, [userData.userId]);

  return (
    <Router>
      {shouldShowNavbar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          userData={userData}
          selectedProducts={selectedProducts}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/SettingUser" element={<Setting userData={userData} />} />
        <Route path="/ShippingLocations" element={<Shipping userData={userData} userId={userData.userId} />} />
        <Route path="/Orderstatus" element={<Orderstatus userData={userData} userId={userData.userId} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route
          path="/product/:id"
          element={<ProdutsDetails userId={userData.userId} />}
        />
        <Route
          path="/products/:category"
          element={<ProductsFilter userId={userData.userId} />}
        />
        <Route
          path="/products/:category/:subcategory"
          element={<ProductsFilter userId={userData.userId} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              userId={userData.userId}
              userData={userData}
              selectedProducts={selectedProducts}
              totalPrice={totalPrice}
              setSelectedProducts={setSelectedProducts}
              setTotalPrice={setTotalPrice}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route
          path="/admin-login"
          element={
            <AdminLogin setIsAdmin={setIsAdmin} setAdminData={setAdminData} />
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminDashboard adminData={adminData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminManageProducts"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminManageProducts adminData={adminData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminManageOrders"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminManageOrders adminData={adminData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminManageCustomrs"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminManageCustomrs adminData={adminData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminPromotions"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminPromotions adminData={adminData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminTeam"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminTeam adminData={adminData} />
            </ProtectedRoute>
          }
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </Router>
  );
}
