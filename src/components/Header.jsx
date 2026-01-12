import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

export default function Header({ searchTerm, setSearchTerm }) {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className={`header-navbar ${scrolled ? "scrolled" : ""}`}>
      <Container>

 {/* زر البرقر */}
        <Navbar.Toggle /> 
        {/* الشعار */}
        <Navbar.Brand as={Link} to="/">يمن بن</Navbar.Brand>

        {/* أيقونات الجوال */}
        <div className="mobile-icons d-lg-none">
          <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
            <Search size={18} />
          </button>

          <Link to="/cart" className="icon-btn cart-icon">
            <ShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </Link>

          <Link to="/account" className="icon-btn">
            <User size={18} />
          </Link>
        </div>

       

        <Navbar.Collapse>
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/">الرئيسية</Nav.Link>
            <Nav.Link href="#bestsellers">الأكثر مبيعًا</Nav.Link>
            <Nav.Link href="#brew">طرق التحضير</Nav.Link>
            <Nav.Link href="#testimonials">آراء العملاء</Nav.Link>
            <Nav.Link as={Link} to="/products">منتجاتنا</Nav.Link>
          </Nav>

          {/* أيقونات الديسكتوب */}
          <div className="desktop-icons d-none d-lg-flex">
            <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
              <Search size={20} />
            </button>

            <Link to="/cart" className="icon-btn cart-icon">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>

            <Link to="/account" className="icon-btn">
              <User size={20} />
            </Link>
          </div>
        </Navbar.Collapse>


        {showSearch && (
          <input
            type="text"
            className="search-input"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate("/search");
            }}
          />
        )}

      </Container>
    </Navbar>
  );
}
