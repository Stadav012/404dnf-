import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting userId from URL

const Profile = () => {
    const { userId } = useParams(); // Get userId from the URL
    const [userData, setUserData] = useState({
        username: "",
        theme: "Light", // Default theme
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    // Fetch user data using userId
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        username: data.username || "",
                        theme: data.theme || "Light",
                    });
                } else {
                    console.log("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }

        getUserData();
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if old password matches with the database
        try {
            const verifyResponse = await fetch(
                `http://localhost:5000/api/user/verify-password/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({ oldPassword }),
                }
            );

            if (!verifyResponse.ok) {
                const errorData = await verifyResponse.json();
                setError(errorData.message || "Old password is incorrect");
                return;
            }

            // Submit updated user data
            const updateResponse = await fetch(
                `http://localhost:5000/api/user/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        username: userData.username,
                        theme: userData.theme,
                        newPassword: newPassword || undefined, // Only send newPassword if provided
                    }),
                }
            );

            if (updateResponse.ok) {
                console.log("User data updated successfully!");
            } else {
                console.log("Failed to update user data");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    {/* Username Field */}
                    <label className="block">
                        <span className="text-gray-700">Username</span>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            placeholder="Username"
                        />
                    </label>

                    {/* Profile Picture Upload */}
                    <label className="block">
                        <span className="text-gray-700">Profile Picture</span>
                        <input
                            type="file"
                            onChange={(e) =>
                                setProfilePicture(e.target.files[0])
                            }
                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                        />
                    </label>

                    {/* Theme Selector */}
                    <label className="block">
                        <span className="text-gray-700">Theme</span>
                        <select
                            name="theme"
                            value={userData.theme}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                        >
                            <option value="Light">Light</option>
                            <option value="Dark">Dark</option>
                        </select>
                    </label>

                    {/* Old Password Field */}
                    <label className="block">
                        <span className="text-gray-700">Old Password</span>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            placeholder="Enter your old password"
                        />
                    </label>

                    {/* New Password Field */}
                    <label className="block">
                        <span className="text-gray-700">New Password</span>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            placeholder="Enter a new password"
                        />
                    </label>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="mt-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
