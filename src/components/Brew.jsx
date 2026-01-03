 import { Coffee, Filter, Droplet } from "lucide-react";
import "../styles/Brew.css";

const brewMethods = [
  { id: 1, title: "V60", disc: "تعلم كيف تختار أفضل أنواع الحبوب حسب ذوقك.", icon: <Filter size={30} /> },
  { id: 2, title: "اسبريسو", disc: "تعلم كيف تختار أفضل أنواع الحبوب حسب ذوقك.", icon: <Coffee size={30} /> },
  { id: 3, title: "قهوة عربية", disc: "تعلم كيف تختار أفضل أنواع الحبوب حسب ذوقك.", icon: <Droplet size={30} /> },
];

export default function Brew() {
 
   

  return (
    // <section className="brew-section" >
    //   <h2 className="text-center mb-4">طرق التحضير</h2>
    //        {brewMethods.map((brew) => (
    //         <div key={brew.id} className="brew-card "  >
    //            <div className="brew-icon">{brew.icon}</div>
    //           <h6 className="brew-title">{brew.title}</h6>
    //           <h6 className="brew-disc">{brew.disc}</h6>
    //           </div>
    //        ))}
    //   </section>
      <section id="brew" className="brew-section">
  <h2 className="text-center mb-4">طرق التحضير</h2>
  <div className="brew-cards-container">
    {brewMethods.map((brew) => (
      <div key={brew.id} className="brew-card">
        <div className="brew-icon">{brew.icon}</div>
        <h6 className="brew-title">{brew.title}</h6>
        <p className="brew-disc">{brew.disc}</p>
      </div>
    ))}
  </div>
</section>

  );
}
