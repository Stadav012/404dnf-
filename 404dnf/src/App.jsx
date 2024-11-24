// App.js
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";

function App() {
    // console log session id
    console.log(sessionStorage.getItem("user_id"));
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
