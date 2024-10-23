// src/Sidebar.js

import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import Ripples from 'react-ripples';

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* logo */}
            <h2>404DNF</h2>
            <ul>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#dashboard"><i className="fas fa-home"></i> Dashboard</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#profile"><i className="fas fa-exclamation-triangle"></i> Report Lost</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#settings"><i className="fas fa-check-circle"></i> Submit Found</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#about"><i className="fas fa-file-alt"></i> Claims</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#smart-locker"><i className="fas fa-box"></i> Smart Locker</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#inbox"><i className="fas fa-inbox"></i> Inbox</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#settings"><i className="fas fa-cog"></i> Settings</a>
                        </Ripples>
                    </div>
                </li>
                <li>
                    <div className="ripple-container">
                        <Ripples color="rgba(255, 0, 0, 0.5)">
                            <a href="#logout"><i className="fas fa-sign-out-alt"></i> Logout</a>
                        </Ripples>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;