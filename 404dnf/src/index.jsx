import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App"; // Main layout component
import Dashboard from "./Dashboard";
import ReportLost from "./ReportLostnFound/ReportLost";
import SubmitPage from "./SubmitPage/SubmitPage";
import { SignupPage } from "./UserAuthPages/SignUpFlow/SignupPage";
import Profile from "./Profile/Profile";
import Inbox from "./Inbox/Inbox";

import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import Users from "./Admin/pages/Users";
import Claims from "./Admin/pages/Claims";

import UserAuth from "./UserAuthPages/UserAuth";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

// A simple 404 component
function NotFound() {
    return (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
            404: Page Not Found
        </h1>
    );
}

// Ensure React 18 API usage
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Main App Layout */}
                <Route path="/" element={<App />}>
                    <Route
                        index
                        element={<PrivateRoute element={<Dashboard />} />}
                    />
                    <Route
                        path="report-lost"
                        element={<PrivateRoute element={<ReportLost />} />}
                    />
                    <Route
                        path="submit-found"
                        element={<PrivateRoute element={<SubmitPage />} />}
                    />
                    <Route
                        path="profile"
                        element={<PrivateRoute element={<Profile />} />}
                    />
                    <Route
                        path="inbox"
                        element={<PrivateRoute element={<Inbox />} />}
                    />
                </Route>

                {/* Admin Layout */}
                <Route
                    path="/admin/*"
                    element={<PrivateRoute element={<AdminLayout />} />}
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="claims" element={<Claims />} />
                </Route>

                {/* User Authentication */}
                <Route path="/auth/*" element={<UserAuth />}>
                    <Route index element={<SignupPage />} />
                </Route>

                {/* Fallback for unmatched routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
