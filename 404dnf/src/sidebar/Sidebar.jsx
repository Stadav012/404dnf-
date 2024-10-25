
import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import Ripples from 'react-ripples';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar state
    };

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`} >
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {/* <h2>404DNF</h2> */}

                <ul>
                    {/** Example of a menu item with icons */}
                    {isOpen && <li>
                        <div className="ripple-container">
                            <Ripples color="rgba(118, 80, 10, 0.5)">
                            {isOpen && <a href="#dashboard">
                                    <i className="fas fa-home"></i>
                                    <span className='sidebar-text'>{isOpen && " Dashboard"}</span>
                                </a>}
                            </Ripples>
                        </div>
                    </li>}
                    {/* Repeat for other items... */}
                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    <span className='sidebar-text'>{isOpen && " Report Lost"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}

                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-check-circle"></i>
                                    <span className='sidebar-text'>{isOpen && " Submit Found"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}

                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-file-alt"></i>
                                    <span className='sidebar-text'>{isOpen && " Claims"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}




                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-box"></i>
                                    <span className='sidebar-text'>{isOpen && " Smart Locker"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}


                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-inbox"></i>
                                    <span className='sidebar-text'>{isOpen && " Inbox"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}


                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-cog"></i>
                                    <span className='sidebar-text'>{isOpen && " Settings"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}

                    {isOpen &&<li>
                        <div className="ripple-container">
                        {isOpen && <Ripples color="rgba(255, 0, 0, 0.5)">
                                <a href="#profile">
                                <i className="fas fa-sign-out-alt"></i>
                                    <span className='sidebar-text'>{isOpen && " Log out"}</span>
                                </a>
                            </Ripples>}
                        </div>
                    </li>}

                </ul>
            </div>

            {/* Menu icon */}
            <div className='menu-icon-container'>
                <Ripples color="rgba(220, 220, 220, 0.5)">
                    <button className="menu-icon" onClick={toggleSidebar}>
                        <i className={`fas ${isOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
                    </button>
                </Ripples>
            </div>
        </div>
    );
};

export default Sidebar;
