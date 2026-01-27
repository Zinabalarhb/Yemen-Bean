import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { searchProducts } from "../services/api.public"; // ✅ API search

export default function SearchPage({ searchTerm }) {
  const { addToCart } = useCart();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const term = searchTerm?.trim();

    if (!term) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await searchProducts(term);
        setResults(data);
      } catch (err) {
        setError("حدث خطأ أثناء البحث");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <section className="products-section" style={{ minHeight: "100vh" }}>
      <Container>
        <h2 className="text-center mb-5">
          {searchTerm
            ? `نتائج البحث عن: "${searchTerm}"`
            : "جميع المنتجات"}
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-danger fs-5">{error}</p>
        )}

        <Row className="g-4">
          {!loading && results.length > 0 ? (
            results.map((product) => (
              <Col key={product.id} lg={4} md={6} sm={12}>
                <div className="p-card">
                  <img
                    src={product.imageUrl}
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
            !loading && (
              <p className="text-center fs-5 mt-4">
                لا توجد نتائج مطابقة 🔍
              </p>
            )
          )}
        </Row>
      </Container>
    </section>
  );
}
