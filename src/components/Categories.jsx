// src/components/Categories.jsx
import "../styles/Categories.css";

import { Container, Row, Col } from "react-bootstrap";
import { Coffee, Filter, Settings, Cpu } from "lucide-react";

const categories = [
  {
    title: "حبوب البن",
    desc: "مختارة من مرتفعات اليمن بنكهة متوازنة",
    icon: Coffee,
  },
  {
    title: "أدوات التقطير",
    desc: "تحكم كامل في الاستخلاص خطوة بخطوة",
    icon: Filter,
  },
  {
    title: "ماكينات الإسبريسو",
    desc: "استخلاص مركز لعشاق القهوة القوية",
    icon: Settings,
  },
  {
    title: "مطاحن القهوة",
    desc: "طحن دقيق يحافظ على جودة النكهة",
    icon: Cpu,
  },
];
 
export default function Categories() {
  return (
    <section id="categories" className="yb-categories">
      <Container>
        <div className="text-center mb-5">
          <h2  >أقسام المتجر</h2>
          <p className="text-muted">
            كل ما تحتاجه لتجربة قهوة متكاملة
          </p>
        </div>

        <Row className="g-2 " >
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Col md={6} lg={3} key={i}>
                <div className="yb-category-item">
                  <Icon size={36} />
                  <h6>{cat.title}</h6>
                  <p>{cat.desc}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
