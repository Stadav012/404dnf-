// logout.js
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function logoutUser() {
    // Remove user data from sessionStorage
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("fname");
    sessionStorage.removeItem("lname");
    sessionStorage.removeItem("profile_pic");
    sessionStorage.removeItem("theme");
    sessionStorage.removeItem("role");

    axios
        .post("/api/Backend/logout.php", null, {
            withCredentials: true, // Important to send cookies with cross-origin requests
        })
        .then((response) => {
            if (response.data.status === "success") {
                console.log("Session ended on server");
                // Redirect to the login page
                window.location.href = "/";
            } else {
                console.error(
                    "Failed to logout on server:",
                    response.data
                );
            }
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
}

function LogoutButton() {
    return (
        <Button
            variant="secondary"
            className="mt-4 w-full"
            onClick={logoutUser}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;
