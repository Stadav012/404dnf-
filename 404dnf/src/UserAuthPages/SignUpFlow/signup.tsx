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
        email: "",
        password: "",
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

        const endpoint = "http://localhost/auth.php";
        const payload = isLogin
            ? {
                  action: "login",
                  email: formData.email,
                  password: formData.password,
              }
            : {
                  action: "register",
                  firstname: formData.firstname,
                  lastname: formData.lastname,
                  email: formData.email,
                  password: formData.password,
              };

        try {
            const response = await axios.post(endpoint, payload);
            setMessage(response.data.message);
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
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                <button
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-black hover:opacity-90 transition-opacity font-bold text-white"
                    type="submit"
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
            <div className="text-center mt-4">
                <button
                    className="text-orange-300 hover:underline"
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
