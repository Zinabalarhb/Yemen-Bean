import React, { useEffect, useState } from "react";
 import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,   // <-- من api.admin
} from "../../services/api.admin";

//  import { getCategories } from "../../services/api.public";
 
 
import "../../styles/AdminCategoriesPage.css";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // Load Categories
  // ===============================
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  // ===============================
  // Add Category
  // ===============================
  const addCategory = async () => {
  if (!newCategory.trim()) return;

  try {
    setLoading(true);

    // ✅ إضافة
    await createCategory({ name: newCategory.trim() });

    // ✅ إعادة تحميل الأقسام (أضمن)
    await loadCategories();

    setNewCategory("");
    setShowForm(false);
  } catch (err) {
    console.log(err);
    alert("❌ فشل إضافة القسم: " + err.message);
  } finally {
    setLoading(false);
  }
};

  // ===============================
  // Delete
  // ===============================
  const deleteCat = async (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;

    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // ===============================
  // Edit
  // ===============================
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async () => {
    if (!editName.trim()) return;

    const data = await updateCategory(editId, { name: editName.trim() });

    setCategories((prev) =>
      prev.map((cat) => (cat.id === editId ? data : cat))
    );

    setEditId(null);
    setEditName("");
  };

  return (
    <div className="admin-categories-page" dir="rtl">
      {/* ================= Header ================= */}
      <div className="page-header">
        <h2>الأقسام</h2>
        <button
          className="btn btn-dark"
          onClick={() => setShowForm(!showForm)}
        >
          + إضافة قسم جديد
        </button>
      </div>

      {/* ================= Add Form ================= */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="أدخل اسم القسم..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-dark w-100"
                  onClick={addCategory}
                  disabled={loading}
                >
                  {loading ? "⏳ جاري الإضافة..." : "إضافة"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Table ================= */}
      <div className="card">
        <div className="card-body table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>اسم القسم</th>
                <th width="180">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    لا توجد أقسام حتى الآن
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      {editId === cat.id ? (
                        <input
                          className="form-control"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td>
                      {editId === cat.id ? (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={saveEdit}
                        >
                          حفظ
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => startEdit(cat)}
                        >
                          تعديل
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCat(cat.id)}
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

export default AdminCategoriesPage;
