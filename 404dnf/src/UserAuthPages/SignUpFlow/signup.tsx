"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import axios from "axios";

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        comfirm_password: "",
    });
    const [message, setMessage] = useState("");

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(""); // Reset message on toggle
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // only submit if passwords match
        if (!isLogin && formData.password !== formData.comfirm_password) {
            setMessage("Passwords do not match.");
            return;
        }

        const endpoint = isLogin
            ? "http://localhost/Backend/login.php"
            : "http://localhost/Backend/create/signup.php";
        const payload = isLogin
            ? {
                  email: formData.email,
                  password: formData.password,
              }
            : {
                  firstname: formData.firstname,
                  username: formData.username,
                  lastname: formData.lastname,
                  email: formData.email,
                  password: formData.password,
                  comfirm_password: formData.comfirm_password,
              };

        try {
            const response = await axios.post(endpoint, payload, {
                withCredentials: true,
            });
            setMessage(response.data.message);

            console.log(response.data);

            // If signup is successful, switch to login form and scroll to the login section
            if (!isLogin && response.data.success) {
                setIsLogin(true);
                // Scroll to login form
                document
                    .getElementById("login-form")
                    .scrollIntoView({ behavior: "smooth" });
            }

            // If login is successful
            if (response.data.message === "Login successful!") {
                // Redirect to the homepage
                sessionStorage.setItem("user_id", response.data.user_id);
                sessionStorage.setItem("username", response.data.username);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("fname", response.data.fname);
                sessionStorage.setItem("lname", response.data.lname);
                sessionStorage.setItem(
                    "profile_pic",
                    response.data.profile_pic
                );
                sessionStorage.setItem("theme", response.data.theme);
                sessionStorage.setItem("role", response.data.role);
                window.location.href = response.data.redirect_url;
            } else {
                setMessage(response.data.message); // Show any error message
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="max-w-lg w-full mx-auto rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-orange-600 via-orange-800 to-black text-white">
            <h2 className="font-extrabold text-3xl text-center">
                {isLogin ? "Welcome Back!" : "Join 404dnf"}
            </h2>
            <p className="text-center text-sm opacity-80 mt-2">
                {isLogin
                    ? "Login to your account and explore more."
                    : "Signup and get started on your journey."}
            </p>
            <form
                id="login-form"
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
            >
                {/* Signup Fields */}
                {!isLogin && (
                    <div className="flex flex-col md:flex-row gap-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input
                                id="firstname"
                                placeholder="Tyler"
                                type="text"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="bg-white text-black"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input
                                id="lastname"
                                placeholder="Durden"
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="bg-white text-black"
                            />
                        </LabelInputContainer>
                    </div>
                )}
                {!isLogin && (
                    <LabelInputContainer>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="tylerdurden"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-white text-black"
                        />
                    </LabelInputContainer>
                )}
                {/* Common Fields */}
                <LabelInputContainer>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="example@domain.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white text-black"
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white text-black"
                    />
                </LabelInputContainer>
                {/* Additional Fields for Signup */}
                {!isLogin && (
                    <LabelInputContainer>
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="comfirm_password"
                            placeholder="••••••••"
                            type="password"
                            value={formData.comfirm_password}
                            onChange={handleChange}
                            className="bg-white text-black"
                        />
                    </LabelInputContainer>
                )}
                <button
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-black hover:opacity-90 transition-opacity font-bold text-white"
                    type="submit"
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
            <div className="text-center mt-4">
                <button
                    className="flex items-center gap-2 justify-center w-full py-2 px-4 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-90 transition-opacity text-white"
                    onClick={toggleForm}
                >
                    {isLogin ? "Switch to Signup" : "Switch to Login"}
                </button>
            </div>
            {message && (
                <p className="mt-4 text-center bg-red-100 text-red-600 p-2 rounded-md">
                    {message}
                </p>
            )}
            <div className="flex gap-4 mt-6">
                <OAuthButton
                    Icon={IconBrandGithub}
                    text="Continue with GitHub"
                />
                <OAuthButton
                    Icon={IconBrandGoogle}
                    text="Continue with Google"
                />
            </div>
        </div>
    );
}

const OAuthButton = ({ Icon, text }) => (
    <button className="flex items-center gap-2 justify-center w-full py-2 px-4 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-90 transition-opacity text-white">
        <Icon className="w-5 h-5" />
        <span>{text}</span>
    </button>
);

const LabelInputContainer = ({ children }) => {
    return <div className="flex flex-col space-y-2">{children}</div>;
};
