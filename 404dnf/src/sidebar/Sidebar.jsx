// Sidebar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Ripples from "react-ripples";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <ul>
                    <li>
                        <Ripples color="rgba(118, 80, 10, 0.5)">
                            <Link to="/">
                                <i className="fas fa-home"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Dashboard"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/report-lost">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Report Lost"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/submit-found">
                                <i className="fas fa-check-circle"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Submit Found"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>
                    {/* Add more links as needed */}
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/admin">
                                <i className="fas fa-chart-line"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Admin"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>
                </ul>
            </div>

            {/* Toggle Button */}
            <div className="menu-icon-container">
                <Ripples color="rgba(220, 220, 220, 0.5)">
                    <button className="menu-icon" onClick={toggleSidebar}>
                        <i
                            className={`fas ${
                                isOpen ? "fa-angle-left" : "fa-angle-right"
                            }`}
                        ></i>
                    </button>
                </Ripples>
            </div>
        </div>
    );
};

export default Sidebar;
