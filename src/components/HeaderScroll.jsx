import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import "../styles/HeaderScroll.css";

export default function HeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className={`header-navbar ${scrolled ? "scrolled" : ""}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">يمن بن</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto ms-auto">
            <Nav.Link as={Link} to="/">الرئيسية</Nav.Link>
            <Nav.Link href="#bestsellers">الأكثر مبيعًا</Nav.Link>
            <Nav.Link href="#brew">طرق التحضير</Nav.Link>
            <Nav.Link href="#testimonials">آراء العملاء</Nav.Link>
            <Nav.Link as={Link} to="/products">منتجاتنا</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {/* بحث */}
            <Button
              variant="link"
              className="icon-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </Button>

            {showSearch && (
              <input
                type="text"
                placeholder="ابحث عن قهوتك..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  navigate("/search");
                }}
              />
            )}

            {/* سلة */}
            <Link to="/cart" className="icon-btn cart-icon">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>

            {/* حساب */}
            <Link to="/account" className="icon-btn">
              <User size={20} />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
