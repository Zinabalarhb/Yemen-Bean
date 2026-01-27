import { useEffect, useState } from "react";
import "../../styles/AdminOrdersPage.css";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/api.admin";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();

        // تحويل البيانات لتتناسب مع شكل الصفحة
        const mapped = data.map((order) => ({
          id: order.id,
          customer: {
            name: order.customerName,
            phone: order.phone,
            city: order.city,
          },
          cart: (order.orderItems || []).map((item) => ({
            name: item.productName,
            quantity: item.quantity,
          })),
          total: order.total,
          status: order.status,
          date: order.createdAt,
        }));

        setOrders(mapped);
      } catch {
        setError("❌ حدث خطأ أثناء تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const customer = order.customer || {};
    const matchesSearch =
      (customer.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (customer.city || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "الكل" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف الطلب؟")) return;

    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) return <p className="text-center">⏳ جاري التحميل...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="admin-orders-page container py-4" dir="rtl">
      <h2 className="mb-4">إدارة الطلبات</h2>

      <input
        className="form-control mb-3"
        placeholder="بحث بالاسم أو المدينة"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
            {filteredOrders.map((order) => {
              const customer = order.customer || {};
              return (
                <tr key={order.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.city}</td>
                  <td>
                    {(order.cart || []).map((item, i) => (
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
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="جديد">🟡 جديد</option>
                      <option value="قيد التنفيذ">🔵 قيد التنفيذ</option>
                      <option value="تم التسليم">✅ تم التسليم</option>
                    </select>
                  </td>
                  <td>
                    {new Date(order.date).toLocaleString("ar-SA")}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
