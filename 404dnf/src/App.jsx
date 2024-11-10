// App.js
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* Routed components will render here */}
      </div>
    </div>
  );
}

export default App;
