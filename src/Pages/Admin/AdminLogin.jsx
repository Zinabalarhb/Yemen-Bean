import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api.auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await adminLogin(email, password);

      // تأكد أن التوكن موجود
      if (!data.token) {
        throw new Error("لم يتم استلام التوكن");
      }

      // حفظ التوكن + الدور
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("role", data.role);

      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "❌ بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <h2>🔐 دخول الأدمن</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
