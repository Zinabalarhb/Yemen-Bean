import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/api.admin";


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const newOrders = orders.filter((o) => o.status === "جديد").length;
  const processingOrders = orders.filter((o) => o.status === "قيد التنفيذ").length;
  const completedOrders = orders.filter((o) => o.status === "تم التسليم").length;

  return (
    <div className="admin-dashboard" dir="rtl">
      <h2 className="mb-4">لوحة التحكم</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <span>عدد الطلبات</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card">
            <span>إجمالي المبيعات</span>
            <strong>{totalRevenue} ر.س</strong>
          </div>
        </div>

        <div className="col-md-2">
          <div className="stat-card new">
            <span>طلبات جديدة</span>
            <strong>{newOrders}</strong>
          </div>
        </div>

        <div className="col-md-2">
          <div className="stat-card processing">
            <span>قيد التنفيذ</span>
            <strong>{processingOrders}</strong>
          </div>
        </div>

        <div className="col-md-2">
          <div className="stat-card done">
            <span>تم التسليم</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header fw-bold">آخر الطلبات</div>

        <div className="card-body p-0">
          {orders.length === 0 ? (
            <p className="text-center p-3">لا توجد طلبات حالياً</p>
          ) : (
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>العميل</th>
                  <th>المدينة</th>
                  <th>الإجمالي</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer?.name}</td>
                    <td>{order.customer?.city}</td>
                    <td>{order.total} ر.س</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.date).toLocaleString("ar-SA")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
