import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import "../styles/CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });
  const [toast, setToast] = useState(false); // لإظهار رسالة النجاح

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.city || !formData.address) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    // حفظ البيانات في LocalStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
      customer: { ...formData },
      cart: cartItems,
      total: total,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    // إظهار Toast
    setToast(true);
    clearCart();
    setFormData({ name: "", phone: "", city: "", address: "" });

    // إخفاء Toast بعد 3 ثواني
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <>
      <section className="Checkout container py-5" dir="rtl">
        <h2 className="text-center mb-4">إتمام الطلب</h2>

        {cartItems.length === 0 ? (
          <p className="text-center">السلة فارغة</p>
        ) : (
          <div className="row g-4">
            {/* بيانات العميل */}
            <div className="col-md-6">
              <h5 className="mb-3">بيانات العميل</h5>
              <form onSubmit={handleSubmit} className="checkout-form">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الجوال"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{9,15}"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="المدينة"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="address"
                  placeholder="العنوان بالتفصيل"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3"
                  disabled={cartItems.length === 0}
                >
                  تأكيد الطلب
                </button>
              </form>
            </div>

            {/* ملخص الطلب */}
            <div className="col-md-6">
              <h5 className="mb-3">ملخص الطلب</h5>
              <div className="order-summary">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{item.price * item.quantity} ر.س</span>
                  </div>
                ))}

                <hr />
                <div className="summary-total">
                  <strong>الإجمالي</strong>
                  <strong>{total} ر.س</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast رسالة النجاح */}
        {toast && (
          <div className="toast-success">
            تم تأكيد الطلب بنجاح ☕
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
