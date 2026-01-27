import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/AccountPage.css";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (isLogin) {
      alert("تم تسجيل الدخول بنجاح ☕");
    } else {
      alert("تم إنشاء الحساب بنجاح ☕");
    }
  };

  return (
    <>
      <section className="account container py-5" dir="rtl">
        <h2 className="text-center mb-4">
          {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
        </h2>

        <div className="account-box mx-auto">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-dark w-100 mt-3">
              {isLogin ? "دخول" : "إنشاء حساب"}
            </button>
          </form>

          <p className="text-center mt-3 switch-text">
            {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " إنشاء حساب" : " تسجيل الدخول"}
            </span>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
