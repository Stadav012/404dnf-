import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting userId from URL
import axios from "axios";

// ShadCN & Acertinity UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
    // Get userId from session storage
    const userId = sessionStorage.getItem("user_id");
    const [userData, setUserData] = useState({
        username: "",
        theme: "vid1", // Default theme
        profilePic: "",
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
            profile_pic: profilePicture || null, // If no new profile picture is selected, send null
        };

        try {
            const response = await axios.put(
                `http://localhost/Backend/Create/update_user_profile.php?user_id=${userId}`,
                jsonData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                sessionStorage.setItem(
                    "username",
                    response.data.username || userData.username
                );
                sessionStorage.setItem(
                    "theme",
                    response.data.theme || userData.theme
                );
                sessionStorage.setItem(
                    "profile_pic",
                    response.data.profile_pic || userData.profilePic
                );
                setCurrentProfilePic(
                    response.data.profile_pic || userData.profilePic
                );
                setSuccess("Profile updated successfully!");
                setError(""); // Clear any previous error messages
            } else {
                setError(response.data.message || "An error occurred.");
                setSuccess("");
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
        <Card className="max-w-3xl mx-auto mt-10 shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Your Profile
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {/* Avatar Section */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                src={
                                    profilePicture ||
                                    currentProfilePic ||
                                    "/default-avatar.png"
                                }
                                alt={userData.username}
                            />
                            <AvatarFallback>
                                {userData.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <input type="file" onChange={handleFileChange} />
                            {profilePicture && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleClearProfilePicture}
                                    className="mt-2"
                                >
                                    Clear Picture
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            Username
                        </label>
                        <Input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                        />
                    </div>

                    {/* Theme Selector */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            Theme
                        </label>
                        <Select
                            value={userData.theme}
                            onValueChange={(value) =>
                                setUserData((prevData) => ({
                                    ...prevData,
                                    theme: value,
                                }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                {userData.theme}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="vid1">Vid1</SelectItem>
                                <SelectItem value="vid2">Vid2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Password Fields */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            Old Password
                        </label>
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter your old password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">
                            New Password
                        </label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter a new password"
                        />
                    </div>

                    {/* Success/Error Messages */}
                    {success && (
                        <Badge
                            variant="success"
                            className="w-full text-center mb-4"
                        >
                            {success}
                        </Badge>
                    )}
                    {error && (
                        <Badge
                            variant="destructive"
                            className="w-full text-center mb-4"
                        >
                            {error}
                        </Badge>
                    )}

                    {/* Save Button */}
                    <Button type="submit" className="w-full">
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default Profile;
