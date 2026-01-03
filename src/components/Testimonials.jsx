import React, { useRef } from "react";
import "../styles/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "أحمد العنسي",
    feedback: "أفضل قهوة ذقتها في حياتي! جودة ممتازة وطعم لا يُنسى.",
    avatar: "../ /images/user1.jpg",
  },
  {
    id: 2,
    name: "سارة القحطاني",
    feedback: "خدمة رائعة، الشحن سريع، والطعم أصلي يمني 100%.",
    avatar: "/images/user2.jpg",
  },
  {
    id: 3,
    name: "محمد اليمني",
    feedback: "كل يوم أبدأ صباحي بفنجان من يمن بن، تجربة مميزة حقًا.",
    avatar: "/images/user3.jpg",
  },
  {
    id: 4,
    name: "نور عبد الله",
    feedback: "منتجات ممتازة وأنيقة، الطعم والفخامة معًا!",
    avatar: "/images/user4.jpg",
  },
   {
    id: 5,
    name: "نور عبد الله",
    feedback: "منتجات ممتازة وأنيقة، الطعم والفخامة معًا!",
    avatar: "/images/user4.jpg",
  },
   {
    id: 6,
    name: "نور عبد الله",
    feedback: "منتجات ممتازة وأنيقة، الطعم والفخامة معًا!",
    avatar: "/images/user4.jpg",
  },
   {
    id: 7,
    name: "نور عبد الله",
    feedback: "منتجات ممتازة وأنيقة، الطعم والفخامة معًا!",
    avatar: "/images/user4.jpg",
  },
];

export default function Testimonials() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollLeft += direction === "right" ? scrollAmount : -scrollAmount;
    }
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="text-center mb-4">آراء العملاء</h2>
      <div className="testimonials-wrapper">
        <button className="nav left" onClick={() => scroll("left")}>&lt;</button>
        <div className="testimonials-carousel" ref={carouselRef}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
              <p className="testimonial-feedback">"{t.feedback}"</p>
              <h6 className="testimonial-name">{t.name}</h6>
            </div>
          ))}
        </div>
        <button className="nav right" onClick={() => scroll("right")}>&gt;</button>
      </div>
    </section>
  );
}
