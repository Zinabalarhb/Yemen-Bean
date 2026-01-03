import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="hero-section"
        style={{ backgroundPositionY: offsetY * 0.5 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">يمن بن</h1>
          <p>
            في جبال اليمن، حيث وُلدت القهوة، نعيد تقديمها بروحها الأصيلة.
            نؤمن أن القهوة ليست مشروبًا… بل تجربة تُعاش بهدوء.
          </p>

          <div className="hero-buttons">
            <Button as={Link} to="/productPage" className="btn-primary-hero">
              تسوق الآن
            </Button>
            <Button as={Link} to="/about" className="btn-secondary-hero">
              تعرف أكثر
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
