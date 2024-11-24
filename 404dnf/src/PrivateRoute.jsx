import React from "react";
import { Navigate } from "react-router-dom";

// The PrivateRoute component checks if the user is logged in
const PrivateRoute = ({ element }) => {
    const isLoggedIn = sessionStorage.getItem("user_id"); // Or use localStorage, context, or a global state

    if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        return <Navigate to="/auth" />;
    }

    return element; // If logged in, render the route element
};

export default PrivateRoute;
