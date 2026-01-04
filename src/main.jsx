import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import "./index.css"; 

// استيراد الـ Providers الصحيحة
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext"; 

// استدعاء الـ root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Providers مغلفة حول App */}
    <SearchProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </SearchProvider>
  </React.StrictMode>
);