import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css"

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

   const [statusFilter, setStatusFilter] = useState("الكل");


  // تحميل الطلبات من LocalStorage عند فتح الصفحة
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // حماية لوحة التحكم
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "1234"; // غيريها


   // تحميل وترتيب الطلبات (الأحدث أولًا)
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const sorted = storedOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setOrders(sorted);
  }, []);

   // إحصائيات
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const newOrders = orders.filter(o => o.status === "جديد").length;
  const processingOrders = orders.filter(o => o.status === "قيد التنفيذ").length;
  const completedOrders = orders.filter(o => o.status === "تم التسليم").length;

  //   // فلترة
  // const filteredOrders = orders.filter(order => {
  //   const matchesSearch =
  //     order.name.toLowerCase().includes(search.toLowerCase()) ||
  //     order.city.toLowerCase().includes(search.toLowerCase());

  //   const matchesStatus =
  //     statusFilter === "الكل" || order.status === statusFilter;

  //   return matchesSearch && matchesStatus;
  // });

  // حذف طلب معين
  const handleDelete = (index) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

    // شاشة تسجيل الدخول
  if (!isAuth) {
    return (
      <div className="container py-5 text-center" dir="rtl">
        <h3 className="mb-4">🔐 دخول لوحة التحكم</h3>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        />

        <button
          className="btn btn-dark"
          onClick={() => {
            if (password === ADMIN_PASSWORD) {
              setIsAuth(true);
            } else {
              alert("كلمة المرور غير صحيحة");
            }
          }}
        >
          دخول
        </button>
      </div>
    );
  }
  
  // تصفية الطلبات حسب البحث
  const filteredOrders = orders.filter((order) =>
    order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.city.toLowerCase().includes(search.toLowerCase())
  );






 return (
    <div className="container py-5" dir="rtl">
      <h2 className="mb-4 text-center">لوحة التحكم – الطلبات</h2>

      {/* الإحصائيات */}
      <div className="row mb-4 text-center">
        <div className="col-md-3">
          <div className="stat-box">
            <h6>عدد الطلبات</h6>
            <strong>{totalOrders}</strong>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-box">
            <h6>إجمالي المبيعات</h6>
            <strong>{totalRevenue} ر.س</strong>
          </div>
        </div>
        <div className="col-md-2">
          <div className="stat-box new">
            <h6>🟡 جديد</h6>
            <strong>{newOrders}</strong>
          </div>
        </div>
        <div className="col-md-2">
          <div className="stat-box processing">
            <h6>🔵 قيد التنفيذ</h6>
            <strong>{processingOrders}</strong>
          </div>
        </div>
        <div className="col-md-2">
          <div className="stat-box done">
            <h6>✅ تم</h6>
            <strong>{completedOrders}</strong>
          </div>
        </div>
      </div>

      {/* البحث */}
      <input
        type="text"
        placeholder="ابحث باسم العميل أو المدينة"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
      />

      {/* فلترة الحالة */}
      <select
        className="form-select mb-3"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="الكل">كل الطلبات</option>
        <option value="جديد">🟡 جديد</option>
        <option value="قيد التنفيذ">🔵 قيد التنفيذ</option>
        <option value="تم التسليم">✅ تم التسليم</option>
      </select>

      {filteredOrders.length === 0 ? (
        <p className="text-center">لا توجد طلبات</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>الاسم</th>
              <th>الجوال</th>
              <th>المدينة</th>
              <th>الطلبات</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.city}</td>
                <td>
                  {order.cart.map((item, i) => (
                    <div key={i}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.total} ر.س</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) => {
                      const updated = [...orders];
                      updated[index].status = e.target.value;
                      setOrders(updated);
                      localStorage.setItem("orders", JSON.stringify(updated));
                    }}
                  >
                    <option value="جديد">🟡 جديد</option>
                    <option value="قيد التنفيذ">🔵 قيد التنفيذ</option>
                    <option value="تم التسليم">✅ تم التسليم</option>
                  </select>
                </td>
                <td>{new Date(order.date).toLocaleString("ar-SA")}</td>
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
