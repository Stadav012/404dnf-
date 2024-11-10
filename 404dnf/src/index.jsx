// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Main layout component
import Dashboard from "./Dashboard"; // Import your individual pages
import ReportLost from "./ReportLostnFound/ReportLost";
import Submit from "./Submit/submit";
import { SignupPage } from "./UserAuthPages/SignUpFlow/SignupPage";
// Import additional page components as needed

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="report-lost" element={<ReportLost />} />
        <Route path="submit-found" element={<Submit />} />
        <Route path="signup" element={<SignupPage />} />
        {/* Add more routes here */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
