// PrivateRoute.js
import { Navigate } from "react-router-dom";

// PrivateRoute for protected pages (only accessible if logged in)
export function PrivateRoute({ element }) {
    const isLoggedIn = sessionStorage.getItem("user_id"); // Example: check user in sessionStorage

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return element;
}

// PublicRoute for auth pages (only accessible if logged out)
export function PublicRoute({ element }) {
    const isLoggedIn = sessionStorage.getItem("user_id");

    if (isLoggedIn) {
        return <Navigate to="/" replace />; // Redirect to Dashboard if logged in
    }

    return element;
}
