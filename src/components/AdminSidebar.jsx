import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Layers,
} from "lucide-react";

import "../styles/AdminSidebar.css";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin" end>
                <LayoutDashboard size={18} />
                <span>لوحة التحكم</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/products">
                <Package size={18} />
                <span>المنتجات</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/orders">
                <ShoppingCart size={18} />
                <span>الطلبات</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/categories">
                <Layers size={18} />
                <span>التصنيفات</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/users">
                <Users size={18} />
                <span>المستخدمون</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
