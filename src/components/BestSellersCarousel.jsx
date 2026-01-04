import React, { useRef, useState } from "react";
import "../styles/BestSellersCarousel.css";
 import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-4.png";
import product3 from "../assets/images/product-8.png";
import product4 from "../assets/images/product-9.png";
import product5 from "../assets/images/product-6.png";
import product6 from "../assets/images/product-7.png";

const bestSellers = [
  { id: 1, name: "قهوة يمنية مختصة", price: 120, image: product1 },
  { id: 2, name: "قهوة سادة", price: 95, image: product2 },
  { id: 3, name: "قهوة بالهيل", price: 130, image: product3 },
  { id: 4, name: "قهوة عربية تقليدية", price: 110, image: product4 },
  { id: 5, name: "كابتشينو", price: 140, image: product5 },
  { id: 6, name: "كابتشينو", price: 140, image: product6 },
  { id: 7, name: "كابتشينو", price: 140, image: product6 },
];

export default function BestSellersCarousel({ searchTerm = "" }) {
  const carouselRef = useRef(null);
  const [animateId, setAnimateId] = useState(null);
  const { addToCart } = useCart();

  const filteredProducts = bestSellers.filter((product) =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );
 
  const scroll = (direction) => {
  if (carouselRef.current) {
    const scrollAmount = 220; // 
    carouselRef.current.scrollLeft += direction === "right" ? scrollAmount : -scrollAmount;
  }
};


  return (
    <section id="bestsellers" className="best-sellers-carousel">
      <h2 className="text-center mb-4">الأكثر مبيعًا</h2>

      <div className="carousel-container">
 
        <div className="carousel" ref={carouselRef}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-card">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="card-overlay">
                  <div className="card-name">{product.name}</div>
                  <div className="price-cart">
                    <span className="product-price">{product.price} ر.س</span>
                    <button
                      className={`add-cart-btn ${animateId === product.id ? "animate" : ""}`}
                      onClick={() => {
                        addToCart(product);
                        setAnimateId(product.id);
                        setTimeout(() => setAnimateId(null), 400);
                      }}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">لا توجد منتجات مطابقة 🔍</p>
          )}
        </div>
        <div className="carousel-nav">
          <button onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </button>
        </div>
        </div>

       </section>
  );
}
