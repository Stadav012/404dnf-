import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Ensure axios is imported
import { cn } from "@/lib/utils";

const SidebarAdmin = () => {
    const [open, setOpen] = useState(false);

    // Logout handler function
    const handleLogout = () => {
        console.log("Started logging out");
        // Remove user data from sessionStorage
        const sessionKeys = [
            "user_id",
            "username",
            "email",
            "fname",
            "lname",
            "profile_pic",
            "theme",
            "role",
        ];
        sessionKeys.forEach((key) => sessionStorage.removeItem(key));

        // Call logout API
        axios
            .post("http://localhost/Backend/logout.php", null, {
                withCredentials: true, // Important for sending cookies
            })
            .then((response) => {
                if (response.data.status === "success") {
                    console.log("Session ended on server");
                    // Redirect to login page
                    window.location.href = "/auth";
                } else {
                    console.error("Failed to logout on server:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    };

    const links = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Users",
            href: "/admin/users",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Claims",
            href: "/admin/claims",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logout",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onClick: handleLogout, // Pass the logout function
        },
    ];

    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink
                                key={idx}
                                link={link}
                                onClick={link.onClick} // Pass onClick to SidebarLink
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <SidebarLink
                        link={{
                            label: "404DNF Team",
                            href: "#",
                            icon: (
                                <img
                                    src="https://assets.aceternity.com/manu.png"
                                    className="h-7 w-7 flex-shrink-0 rounded-full"
                                    width={50}
                                    height={50}
                                    alt="Avatar"
                                />
                            ),
                        }}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
};

// Logo and LogoIcon remain the same
export const Logo = () => (
    <Link
        to="/admin"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-black dark:text-white whitespace-pre"
        >
            404 DNF
        </motion.span>
    </Link>
);

export const LogoIcon = () => (
    <Link
        to="/admin"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
);

export default SidebarAdmin;
