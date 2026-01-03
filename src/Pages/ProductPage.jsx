import React, { useState } from "react";
import "../styles/ProductPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

import Footer from "../components/Footer";
 import { useSearch } from "../context/SearchContext";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-4.png";
import product3 from "../assets/images/product-8.png";
import product4 from "../assets/images/product-9.png";
import product5 from "../assets/images/product-6.png";
import product6 from "../assets/images/product-7.png";

const products = [
  { id: 1, name: "قهوة يمنية مختصة", price: 120, image: product1 },
  { id: 2, name: "قهوة سادة", price: 95, image: product2 },
  { id: 3, name: "قهوة بالهيل", price: 130, image: product3 },
  { id: 4, name: "قهوة عربية تقليدية", price: 110, image: product4 },
  { id: 5, name: "كابتشينو", price: 140, image: product5 },
  { id: 6, name: "كابتشينو", price: 140, image: product6 },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [animatingId, setAnimatingId] = useState(null);
  const { searchTerm: contextSearchTerm } = useSearch(); // تم إعادة التسمية لتجنب التضارب

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((contextSearchTerm || "").toLowerCase())
  );

  return (
    <>
 
      <section
        id="products"
        className="products-section"
        style={{ backgroundColor: "var(--section-bg)" }}
      >
        <Container>
          <h2 className="text-center mb-5">
            {contextSearchTerm
              ? `نتائج البحث عن "${contextSearchTerm}"`
              : "منتجاتنا"}
          </h2>

          <Row className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col key={product.id} lg={4} md={6} sm={12}>
                  <div className="p-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                    />

                    <div className="card-overlay">
                      <div className="card-name">{product.name}</div>

                      <div className="price-cart">
                        <span className="product-price">{product.price} ر.س</span>

                        <button
                          className={`add-cart-btn ${
                            animatingId === product.id ? "animate" : ""
                          }`}
                          onClick={() => {
                            addToCart(product);
                            setAnimatingId(product.id);
                            setTimeout(() => setAnimatingId(null), 400);
                          }}
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center">لا توجد منتجات مطابقة 🔍</p>
            )}
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
