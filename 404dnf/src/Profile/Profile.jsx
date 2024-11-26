"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// ShadCN UI Components
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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Profile = () => {
    const userId = sessionStorage.getItem("user_id");
    const [userData, setUserData] = useState({
        username: "",
        theme: "vid1",
        profilePic: "",
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentProfilePic, setCurrentProfilePic] = useState(null);

    const { toast } = useToast();

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
        setCurrentProfilePic(sessionData.profile_pic);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            username: userData.username,
            theme: userData.theme,
            old_password: oldPassword || "",
            new_password: newPassword || "",
            profile_pic: profilePicture || null,
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
                console.log("Response data:", response.data);
                // check for each update that has been made
                if(response.data.updates.username_update){
                    // update the session storage
                    if(response.data.updates.username_update.success){
                    sessionStorage.setItem("username", response.data.updates.username_update.username);
                }
                if(response.data.updates.theme_update){
                    if(response.data.updates.theme_update.success){
                        sessionStorage.setItem("theme", response.data.updates.theme_update.theme);
                    }
                }
                if(response.data.updates.profile_pic_update){
                    if(response.data.updates.profile_pic_update.success){
                        sessionStorage.setItem("profile_pic", response.data.updates.profile_pic_update.profile_pic);
                        // full url of image
                        let image_url = `http://localhost/Backend/Create${response.data.updates.profile_pic_update.profile_pic}`;
                        // console.log("Image URL:", image_url);
                        setCurrentProfilePic(image_url);
                    }
                }

                }


                toast({
                    title: "Profile Updated!",
                    description: "Your profile has been updated successfully.",
                    action: (
                        <ToastAction altText="Undo changes">Undo</ToastAction>
                    ),
                });
            } else {
                toast({
                    title: "Update Failed",
                    description:
                        response.data.message || "Something went wrong.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast({
                title: "Error",
                description: "An error occurred while updating your profile.",
                variant: "destructive",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
