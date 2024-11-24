import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client"; // Import the correct module for React 18
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Main layout component
import Dashboard from "./Dashboard"; // Import your individual pages
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

// Create the root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app using the createRoot API
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="report-lost" element={<ReportLost />} />
                <Route path="submit-found" element={<SubmitPage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="inbox" element={<Inbox />} />
            </Route>
            <Route path="/admin/*" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="claims" element={<Claims />} />
            </Route>
            <Route path="/auth/*" element={<UserAuth />}>
                <Route index element={<SignupPage />} />
            </Route>
            <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
    </BrowserRouter>
);
