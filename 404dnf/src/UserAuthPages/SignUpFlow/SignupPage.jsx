import React from "react";
import { AuthForm } from "./signup";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignupPage = () => {
    return (
        <>
            <div className="relative z-10">
                <AuthForm />
            </div>
            <BackgroundBeams />
        </>
    );
};

export { SignupPage };
