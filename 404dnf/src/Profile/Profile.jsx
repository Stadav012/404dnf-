import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting userId from URL
import axios from "axios"; // Importing axios

const Profile = () => {
    // const { userId } = useParams(); // Get userId from the URL

    // get the userid from the session storage
    const userId = sessionStorage.getItem("user_id");
    const [userData, setUserData] = useState({
        username: "",
        theme: "vid1", // Default theme
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [currentProfilePic, setCurrentProfilePic] = useState(null);

    // Fetch user data from sessionStorage when the page loads
    useEffect(() => {
        const sessionData = {
            username: sessionStorage.getItem("username"),
            theme: sessionStorage.getItem("theme") || "vid1",
            profilePic: sessionStorage.getItem("profile_pic"),
        };
        setUserData((prevData) => ({
            ...prevData,
            ...sessionData,
        }));
        setCurrentProfilePic(sessionData.profilePic); // Set current profile picture
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // save the file on the local storage
        // get the the file path
        // save the file path on the database

        // // Create FormData object for the profile picture and other form data
        // const formData = new FormData();
        // formData.append("username", userData.username);
        // formData.append("theme", userData.theme);
        // formData.append("oldPassword", oldPassword);
        // formData.append("newPassword", newPassword || "");

        const jsonData = {
            username: userData.username,
            theme: userData.theme,
            old_password: oldPassword || "",
            new_password: newPassword || "",
            profile_pic: profilePicture || null // If no new profile picture is selected, send null
        };
        
        try {
            const response = await axios.put(
                `http://localhost/Backend/Create/update_user_profile.php?user_id=${userId}`,
                jsonData, // JSON object
                {
                    headers: {
                        "Content-Type": "application/json", // Specify JSON content type
                        // Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        
            if (response.status === 200) {
                console.log(response.data.message, response.status);
                sessionStorage.setItem("username", userData.username);
                sessionStorage.setItem("theme", userData.theme);
                sessionStorage.setItem("profile_pic", response.data.profile_pic);
                setCurrentProfilePic(response.data.profile_pic); // Update the profile picture in state
            } else if (response.status === 400) {
                console.log(response.data.message, response.status);
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setError("An error occurred while updating your profile.");
        }
        
        
        // If a new profile picture is selected, append it to the formData
        // if (profilePicture) {
        //     formData.append("profile_pic", profilePicture);
        // }

        // Make Axios request to update user profile
        // try {
        //     const response = await axios.put(
        //         // console.log("URL: ", `http://localhost/Backend/Create/update_user_profile.php?user_id=${userId}`),
        //         `http://localhost/Backend/Create/update_user_profile.php?user_id=${userId}`,
        //         formData, 
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data", // Specify content type
        //                 // Authorization: `Bearer ${localStorage.getItem("token")}`,
        //             },
        //         }
        //     );
        //     if (response.status === 200) {
        //         console.log(response.data.message, response.status);
        //         // Optionally, store the updated data in sessionStorage for future use
        //         sessionStorage.setItem("username", userData.username);
        //         sessionStorage.setItem("theme", userData.theme);
        //         sessionStorage.setItem("profile_pic", response.data.profile_pic);
        //         setCurrentProfilePic(response.data.profile_pic); // Update the profile picture in state
        //     }
        //     else if(response.status === 400){
        //         console.log("No changes made.");
        //         setError("No changes made.");
        //     }
        // } catch (error) {
        //     console.error("Error during form submission:", error);
        //     setError("An error occurred while updating your profile.");
        // }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle profile picture selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    // Handle clearing the profile picture
    const handleClearProfilePicture = () => {
        setProfilePicture(null);
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

                    {/* Profile Picture Display */}
                    <label className="block">
                        <span className="text-gray-700">Profile Picture</span>
                        <div className="flex items-center gap-2">
                            {currentProfilePic && !profilePicture && (
                                <img
                                    src={currentProfilePic}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                            />
                            {profilePicture && (
                                <button
                                    type="button"
                                    onClick={handleClearProfilePicture}
                                    className="text-red-500 text-sm"
                                >
                                    Clear Picture
                                </button>
                            )}
                        </div>
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
                            <option value="vid1">Vid1</option>
                            <option value="vid2">Vid2</option>
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
