import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/* ========= Public Pages ========= */
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SearchPage from "./Pages/SearchPage";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";
import CheckoutPage from "./Pages/CheckoutPage";

/* ========= Admin Pages ========= */
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProductsPage from "./Pages/Admin/AdminProductsPage";
import AdminOrdersPage from "./Pages/Admin/AdminOrdersPage";
import AdminCategoriesPage from "./Pages/Admin/AdminCategoriesPage";
import AdminUsersPage from "./Pages/Admin/AdminUsersPage";
import AdminLogin from "./Pages/Admin/AdminLogin";

/* ========= Layouts & Routes ========= */
import AdminRoute from "./routes/AdminRoute";
import PublicLayout from "./Layouts/PublicLayout";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Routes>
        {/* ================= Public Routes ================= */}
        <Route
          path="/"
          element={
            <PublicLayout
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage searchTerm={searchTerm} />} />
          <Route path="products" element={<ProductPage searchTerm={searchTerm} />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* ================= Admin Login ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= Admin Protected ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* 👇 مهم: دخول /admin يودّي للداشبورد */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
