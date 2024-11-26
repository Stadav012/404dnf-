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
        profilePic : "",

    });
    const [success, setSuccess] = useState("");
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
            profile_pic: sessionStorage.getItem("profile_pic"),
        };
        setUserData((prevData) => ({
            ...prevData,
            ...sessionData,
        }));
        setCurrentProfilePic(sessionData.profile_pic); // Set current profile picture
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();


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
                sessionStorage.setItem("username", (response.data.username ? response.data.username:  userData.username));
                sessionStorage.setItem("theme", (response.data.theme ? response.data.theme:  userData.theme));
                sessionStorage.setItem("profile_pic", (response.data.profile_pic ? response.data.profile_pic:  userData.profilePic));
                setCurrentProfilePic((response.data.profile_pic ? response.data.profile_pic:  userData.profilePic)); // Update the profile picture in state
                console.log("Profile Picture:", (response.data.profile_pic ? response.data.profile_pic:  userData.profilePic));
                setSuccess("Profile updated successfully!");
                setError(""); // Clear any previous error messages
            }
            // if(response.status > 200 && response.status < 300) {
            //     console.log(response.data.message, response.status);
            //     setSuccess(response.data.message);
            //     setError(""); // Clear error message on success
            // }
            else if (response.status === 400) {
                console.log(response.data.message, response.status);
                setError(response.data.message);
                setSuccess(""); // Clear success message on error
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setError("An error occurred while updating your profile.");
        }
        
        

    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setSuccess(""); // Clear success message on input change
    };

    // Handle profile picture selection
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfilePicture(file);
    //     }
    // };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result); // Set Base64 string
            };
            reader.readAsDataURL(file); // Read file as a data URL (Base64 string)
        }
        setSuccess(""); // Clear success message on file change
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
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </div>
    );
};

export default Profile;
