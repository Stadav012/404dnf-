import React, { useEffect } from "react";
import { AuthForm } from "./signup";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignupPage = () => {
    console.log("UserAuth layout is rendered");

    useEffect(() => {
        console.log("UserAuth layout mounted");
        return () => console.log("UserAuth layout unmounted");
    }, []);

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
