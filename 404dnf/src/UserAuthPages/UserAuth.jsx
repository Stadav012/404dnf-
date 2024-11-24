import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/user_auth.css";

function UserAuth() {
    return (
        <div className="UserAuth">
            <Outlet />
        </div>
    );
}

export default UserAuth;
