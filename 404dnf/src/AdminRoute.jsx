import React from "react";
import { Navigate } from "react-router-dom";

// AdminRoute Component
const AdminRoute = ({ element }) => {
    const isLoggedIn = sessionStorage.getItem("user_id"); // Check if user is logged in
    const userRole = sessionStorage.getItem("role"); // Fetch user role (assume "role" is stored in session)

    if (!isLoggedIn) {
        // If not logged in, redirect to login
        return <Navigate to="/auth" />;
    }

    if (userRole !== "admin") {
        // If not an admin, redirect to dashboard or a not authorized page
        return <Navigate to="/" />;
    }

    return element; // Render the admin route if logged in and role is admin
};

export default AdminRoute;
