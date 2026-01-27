import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Home } from "lucide-react";

import "../styles/AdminHeader.css";

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const goToWebsite = () => {
    navigate("/"); // الصفحة الرئيسية للموقع
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h4>لوحة التحكم</h4>
      </div>

      <div className="admin-header-right">
        {/* زر العودة للموقع */}
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={goToWebsite}
        >
          <Home size={16} className="ms-1" />
          الموقع
        </Button>

        {/* تسجيل الخروج */}
        <Button variant="outline-danger" onClick={handleLogout}>
          تسجيل خروج
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
