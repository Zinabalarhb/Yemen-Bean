import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";
 

export default function Header({ searchTerm, setSearchTerm }) {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const { cartItems } = useCart();
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className={`header-navbar ${scrolled ? "scrolled" : ""}`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">يمن بن</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto text-center">
              <Nav.Link as={Link} to="/">الرئيسية</Nav.Link>
              <Nav.Link href="#bestsellers">الأكثر مبيعًا</Nav.Link>
              <Nav.Link href="#brew">طرق التحضير</Nav.Link>
              <Nav.Link  href="#testimonials">آراء العملاء</Nav.Link>
              <Nav.Link as={Link} to="/productPage">منتجاتنا</Nav.Link>
               
            </Nav>

            <div className="d-flex align-items-center justify-content-center gap-2 ">
              <Button
                variant="link"
                className="icon-btn"
                onClick={() => setShowSearch(!showSearch)}
                onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (value.trim()) {
                  navigate("/search");
                }
              }}
              >
                <Search size={20} />
              </Button>

              {showSearch && (
                <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  navigate("/search");
                }}
                className="search-input"
              />
              )}

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
        </Container>
      </Navbar>
      </>
  )
}
