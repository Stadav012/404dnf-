import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ripples from "react-ripples";
import "./Sidebar.css";
import LogoutButton from "../logout";
import axios from "axios";

const Sidebar = () => {

    
    const [isOpen, setIsOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [messageCount, setMessageCount] = useState(0);

    // Fetch user role on component mount
    useEffect(() => {
        const userRole = sessionStorage.getItem("role"); // Assuming role is stored in sessionStorage
        if (userRole === "admin") {
            setIsAdmin(true);
        }

        // get the userid from the session storage
        const userId = sessionStorage.getItem("user_id");

        // Fetch message count
        const fetchMessageCount = async () => {
            try {
                const response = await axios.get(`/api/Backend/Read/num_matches.php?user_id=${userId}`);
                setMessageCount(response.data.count > 0 ? response.data.count : 0);
                // setMessageCount(1); 
                console.log("Message Count:", response.data.count);
            } catch (error) {
                console.error("Error fetching message count:", error);
            }
        };
    
        fetchMessageCount();

    }, []);

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
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/profile">
                                <i className="fas fa-user"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Profile"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/inbox">
                                <i className="fas fa-inbox">
                                <span className="message-count">
                                {messageCount >= 1 && `(${messageCount})`}
                                            
                                    </span>
                                </i>
                                <span className="sidebar-text">
                                    {isOpen && " Inbox"}

                                </span>
                            </Link>
                        </Ripples>
                    </li>

                    {/* add messages  */}
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <Link to="/messages">
                                <i className="fas fa-envelope"></i>
                                <span className="sidebar-text">
                                    {isOpen && " Messages"}
                                </span>
                            </Link>
                        </Ripples>
                    </li>

                    {/* Admin link: Show only if the user is admin */}
                    {isAdmin && (
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
                    )}

                    {/* Logout Button */}
                    <li>
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <LogoutButton />
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
