import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  createUser,
} from "../../services/api.admin";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف المستخدم؟")) return;
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser(form);
    setUsers((prev) => [...prev, newUser]);
    setForm({ name: "", email: "", password: "", role: "User" });
    setShowForm(false);
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="admin-users-page" dir="rtl">
      <div className="page-header d-flex justify-content-between mb-3">
        <h2>المستخدمين</h2>
        <button
          className="btn btn-dark"
          onClick={() => setShowForm(!showForm)}
        >
          + إضافة مستخدم جديد
        </button>
      </div>

      {/* 🟢 فورم الإضافة */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="mb-3">إضافة مستخدم</h5>
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="الاسم"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="البريد الإلكتروني"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  placeholder="كلمة المرور"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-dark">
                  حفظ
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔍 البحث */}
      <div className="filters row g-3 mb-4">
        <div className="col-md-8">
          <input
            className="form-control"
            placeholder="بحث باسم المستخدم أو البريد..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 📋 الجدول */}
      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد</th>
                <th>الدور</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    لا يوجد مستخدمين
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
