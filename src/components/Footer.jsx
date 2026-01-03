import { Container } from 'react-bootstrap';
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p className="footer-main">يمن بن — قهوة تُقدّم بفخر ☕</p>
        <p className="footer-copy">جميع الحقوق محفوظة © 2025</p>
      </Container>
    </footer>
  );
}
