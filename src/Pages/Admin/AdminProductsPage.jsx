import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import {
 
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getCategories
} from "../../services/api.admin";

import{    getProducts,
} from "../../services/api.public";


import "../../styles/AdminProductsPage.css";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      // console.log(data); // 👈 شوف هل يوجد imageUrl؟
       setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setName("");
    setPrice("");
    setCategoryId("");
    setImageFile(null);
    setMessage("");
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setName(product.name);
    setPrice(product.price);
    setCategoryId(product.categoryId || ""); // حسب اسم الحقل في API
    setImageFile(null);
    setMessage("");
    setShowModal(true);
  };

 const handleSave = async (e) => {
  e.preventDefault();

  try {
    setMessage("⏳ جاري الإضافة...");

    // 1) رفع الصورة أولًا إذا تم اختيار صورة
    let imageUrl = editProduct ? editProduct.imageUrl : null;

    if (imageFile) {
      const uploadRes = await uploadImage(imageFile); // من api.admin.js
      imageUrl = uploadRes.url || uploadRes.Url || uploadRes.Url;
    }

    // 2) تجهيز بيانات المنتج
    const productData = {
      name,
      price: Number(price),
      categoryId: Number(categoryId),
      imageUrl,
    };

    // 3) إذا كان تعديل
    if (editProduct) {
      await updateProduct(editProduct.id, productData);
      setMessage("✅ تم تحديث المنتج بنجاح");
    } else {
      await createProduct(productData);
      setMessage("✅ تم إضافة المنتج بنجاح");
    }

    // تحديث القائمة بعد الإضافة/التعديل
    loadProducts(); // أو دالة تحميل المنتجات عندك

    // إغلاق المودال
    setShowModal(false);

  } catch (error) {
    setMessage("❌ فشل الإضافة: " + (error.message || error));
  }
};




  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف المنتج؟")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("❌ فشل حذف المنتج");
    }
  };

  return (
    <Container className="admin-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛠 إدارة المنتجات</h2>
        <Button className="btn-add" onClick={handleAdd}>
          ➕ إضافة منتج
        </Button>
      </div>

      {loading ? (
        <p>⏳ جاري التحميل...</p>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6}>
              <div className="product-card">
                <img
                src={`https://localhost:7189${product.imageUrl}`}
                  alt={product.name}
                  className="product-img"
                />
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">{product.price} ر.س</p>
                <div className="product-actions">
                  <Button
                    className="btn-edit me-2"
                    onClick={() => handleEdit(product)}
                  >
                    ✏️ تعديل
                  </Button>
                  <Button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑 حذف
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <p>{message}</p>}
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>اسم المنتج</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>السعر (ر.س)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

                      <Form.Group className="mb-3">
              <Form.Label>الفئة</Form.Label>
              <Form.Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">اختر الفئة</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>صورة المنتج</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Group>

            {editProduct && !imageFile && (
              <div className="mb-3 text-center">
                <p>الصورة الحالية:</p>
                <img
                  src={`https://localhost:7189${editProduct.imageUrl}`}
                  alt={editProduct.name}
                  className="product-img"
                />
              </div>
            )}

            <Button type="submit" className="w-100">
              {editProduct ? "💾 حفظ التعديلات" : "➕ إضافة المنتج"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
