import { useEffect, useState } from "react";
import "../styles/ProductPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/api";
import Footer from "../components/Footer";
import { useSearch } from "../context/SearchContext";

export default function ProductPage() {
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [animatingId, setAnimatingId] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("حدث خطأ أثناء تحميل المنتجات"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes((searchTerm || "").toLowerCase())
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
            {searchTerm
              ? `نتائج البحث عن "${searchTerm}"`
              : "منتجاتنا"}
          </h2>

          {/* Loading */}
          {loading && (
            <p className="text-center my-5">⏳ جاري تحميل المنتجات...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-danger my-5">{error}</p>
          )}

          {/* Products */}
          {!loading && !error && (
            <Row className="g-4 justify-content-center">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col
                    key={product.id}
                    lg={4}
                    md={6}
                    sm={12}
                    className="d-flex justify-content-center"
                  >
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
          )}
        </Container>
      </section>

      <Footer />
    </>
  );
}
