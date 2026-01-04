import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css"

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // تحميل الطلبات من LocalStorage عند فتح الصفحة
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // حذف طلب معين
  const handleDelete = (index) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

  // تصفية الطلبات حسب البحث
  const filteredOrders = orders.filter((order) =>
    order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5" dir="rtl">
      <h2 className="mb-4 text-center">لوحة التحكم - الطلبات</h2>

      {/* حقل البحث */}
      <input
        type="text"
        placeholder="ابحث باسم العميل أو المدينة"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
      />

      {filteredOrders.length === 0 ? (
        <p className="text-center">لا توجد طلبات مطابقة</p>
      ) : (
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>الاسم</th>
              <th>رقم الجوال</th>
              <th>المدينة</th>
              <th>الطلبات</th>
              <th>الإجمالي</th>
              <th>تاريخ الطلب</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>{order.customer.city}</td>
                <td>
                  {order.cart.map((item, i) => (
                    <div key={i} title={`${item.name} × ${item.quantity}`}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.total} ر.س</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
