import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-4.png";
import product3 from "../assets/images/product-8.png";
import product4 from "../assets/images/product-9.png";
import product5 from "../assets/images/product-6.png";
import product6 from "../assets/images/product-7.png";

export default function SearchPage({ searchTerm }) {
  const { addToCart } = useCart();
  const [results, setResults] = useState([]);

  const PRODUCTS = [
    { id: 1, name: "قهوة يمنية مختصة", price: 120, image: product1 },
    { id: 2, name: "قهوة سادة", price: 95, image: product2 },
    { id: 3, name: "قهوة بالهيل", price: 130, image: product3 },
    { id: 4, name: "قهوة عربية تقليدية", price: 110, image: product4 },
    { id: 5, name: "كابتشينو", price: 140, image: product5 },
    { id: 6, name: "كابتشينو", price: 140, image: product6 },
  ];

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setResults([]);
      return;
    }

    setResults(
      PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  return (
    <section
      className="products-section"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <h2 className="text-center mb-5">
          {searchTerm
            ? `نتائج البحث عن: "${searchTerm}"`
            : "جميع المنتجات"}
        </h2>

        <Row className="g-4">
          {results.length > 0 ? (
            results.map((product) => (
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
                      <span className="product-price">
                        {product.price} ر.س
                      </span>

                      <button
                        className="add-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center fs-5 mt-4">
              لا توجد نتائج مطابقة 🔍
            </p>
          )}
        </Row>
      </Container>
    </section>
  );
}
