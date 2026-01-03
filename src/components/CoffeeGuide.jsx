import { Container, Row, Col, Card } from 'react-bootstrap';

const guides = [
  { title: "اختيار الحبوب", desc: "تعلم كيف تختار أفضل أنواع الحبوب حسب ذوقك." },
  { title: "طرق التحميص", desc: "فهم الفرق بين التحميص الفاتح والمتوسط والغامق." },
  { title: "أفضل طرق التقطير", desc: "تقنيات تساعدك على استخلاص أفضل نكهة لكل نوع قهوة." },
];

export default function CoffeeGuide() {
  return (
    <section id="CoffeeGuide" style={{ padding: "80px 0" }}>
      <Container>
        <Row className="g-3">
          {guides.map((guide, i) => (
            <Col key={i} md={4}>
              <Card className="border-0 shadow-sm rounded-3 p-3 h-100">
                <Card.Body>
                  <Card.Title style={{ color: "var(--coffee-brown-dark)" }}>{guide.title}</Card.Title>
                  <Card.Text>{guide.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
