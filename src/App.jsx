import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CartProvider } from "./context/CartContext";

import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SearchPage from "./Pages/SearchPage";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";

import Header from "./components/Header";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <CartProvider>
      <Router>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/search"
            element={<SearchPage searchTerm={searchTerm} />}
          />
          <Route
            path="/productPage"
            element={<ProductPage searchTerm={searchTerm} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
