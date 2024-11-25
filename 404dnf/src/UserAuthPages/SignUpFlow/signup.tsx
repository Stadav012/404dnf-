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
        confirm_password: "",
    });
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(""); // Reset message on toggle
        setErrors({}); // Clear errors
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        const validationErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!isLogin) {
            if (!formData.firstname)
                validationErrors.firstname = "First name is required.";
            if (!formData.lastname)
                validationErrors.lastname = "Last name is required.";
            if (!formData.username)
                validationErrors.username = "Username is required.";
        }

        if (!formData.email || !emailRegex.test(formData.email)) {
            validationErrors.email = "A valid email address is required.";
        }

        if (!formData.password || formData.password.length < 8) {
            validationErrors.password =
                "Password must be at least 8 characters.";
        }

        if (!isLogin && formData.password !== formData.confirm_password) {
            validationErrors.confirm_password = "Passwords do not match.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage("Please fix the errors before submitting.");
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
              };

        try {
            const response = await axios.post(endpoint, payload, {
                withCredentials: true,
            });

            // Handle success
            setMessage(response.data.message);

            if (!isLogin && response.data.success) {
                setIsLogin(true);
                setMessage("Signup successful! You can now log in.");
                setFormData({
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                });
            }

            if (isLogin && response.data.message === "Login successful!") {
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
            }
        } catch (error) {
            // Check if the error is due to duplicate email
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : "Something went wrong. Please try again.";

            if (error.response && error.response.status === 409) {
                if (error.response.data.message.includes("email")) {
                    setErrors({ email: "This email is already in use." });
                } else {
                    setErrors({});
                }
            }

            setMessage(errorMessage);
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
                            {errors.firstname && (
                                <ErrorText message={errors.firstname} />
                            )}
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
                            {errors.lastname && (
                                <ErrorText message={errors.lastname} />
                            )}
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
                        {errors.username && (
                            <ErrorText message={errors.username} />
                        )}
                    </LabelInputContainer>
                )}
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
                    {errors.email && <ErrorText message={errors.email} />}
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
                    {errors.password && <ErrorText message={errors.password} />}
                </LabelInputContainer>
                {!isLogin && (
                    <LabelInputContainer>
                        <Label htmlFor="confirm_password">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm_password"
                            placeholder="••••••••"
                            type="password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            className="bg-white text-black"
                        />
                        {errors.confirm_password && (
                            <ErrorText message={errors.confirm_password} />
                        )}
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
                <p
                    className={`mt-4 text-center ${
                        message.includes("successful")
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    } p-2 rounded-md`}
                >
                    {message}
                </p>
            )}
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

const ErrorText = ({ message }) => (
    <p className="text-sm text-red-500 mt-1">{message}</p>
);
