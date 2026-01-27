import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

import "../../styles/AdminLayout.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      {/* Admin Body */}
      <div className="admin-body">
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
