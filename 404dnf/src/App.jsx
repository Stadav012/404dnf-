// App.js
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";

// Import ToastProvider and Toaster from ShadCN
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

function App() {
    console.log(sessionStorage.getItem("user_id")); // Log session ID for debugging

    return (
        <ToastProvider>
            {" "}
            {/* Wrap the app in ToastProvider */}
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Outlet /> {/* Routed components will render here */}
                </div>
            </div>
            <Toaster /> {/* Render Toaster outside the main content */}
        </ToastProvider>
    );
}

export default App;
