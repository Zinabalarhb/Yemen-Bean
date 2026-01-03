import { Container, Button } from 'react-bootstrap';
import { Coffee } from 'lucide-react';

export default function PrepAssistant() {
  return (
    <section  id="PrepAssistant" style={{ padding: "80px 0", backgroundColor: "var(--section-bg)" }}>
      <Container className="text-center">
        <h2 style={{ color: "var(--coffee-brown-dark)" }}>مساعد التحضير</h2>
        <p>لا تعرف ماذا تختار؟ أجب على 3 أسئلة وسنرشح لك نوع البن المثالي لذوقك.</p>
        <Button style={{
          backgroundColor: "var(--coffee-brown-light)",
          border: "none",
          borderRadius: "999px",
          padding: "10px 25px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "auto"
        }}>
          <Coffee size={18} /> ابدأ الآن
        </Button>
      </Container>
    </section>
  );
}
