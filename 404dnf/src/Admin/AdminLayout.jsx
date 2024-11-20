// AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./components/SidebarAdmin"; // Admin-specific sidebar
import "./styles/Admin.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="admin-content">
        <Outlet /> {/* Routed components for admin pages will render here */}
      </div>
    </div>
  );
}

export default AdminLayout;