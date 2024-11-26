"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/animations/loading.json";
import Video from "./Video/video";
import Statistics from "./Statistics/Statistics";
import Section from "./Sections/Sections";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Avatar } from "@/components/ui/avatar"; // ShadCN Avatar
import { IconClipboardCopy, IconTrophy, IconBox } from "@tabler/icons-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { SparklesCore } from "@/components/ui/sparkles";

// Lottie Loader Component
function Loader() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <Lottie
                loop
                animationData={loadingAnimation}
                play
                style={{ width: 300, height: 300 }}
            />
        </div>
    );
}

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [submissionStats, setSubmissionStats] = useState(null);
    const [error, setError] = useState("");

    // Fetch submission stats from API
    useEffect(() => {
        const userId = sessionStorage.getItem("user_id"); // Retrieve user_id from sessionStorage
        if (!userId) {
            setError("User not logged in. Please log in.");
            setLoading(false);
            return;
        }

        axios
            .get(
                `http://localhost/Backend/Read/submission_stats.php?user_id=${userId}`
            )
            .then((response) => {
                const data = response.data;
                if (data.submission_stats) {
                    setSubmissionStats(data.submission_stats);
                } else {
                    setError(data.message || "No stats found.");
                }
                setLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    setError(
                        err.response.data.message || "Failed to fetch stats."
                    );
                } else {
                    setError("An unknown error occurred.");
                }
                setLoading(false);
            });
    }, []);

    // Show loader while fetching data
    if (loading) {
        return <Loader />;
    }

    // Show error message if any
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    const username = sessionStorage.getItem("username") || "Guest";
    const profilePic =
        sessionStorage.getItem("profile_pic") || "../public/logo192.png"; // Fallback to default avatar

    return (
        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[30rem] gap-y-24 p-5">
            {/* Video Item */}
            <BentoGridItem
                header={
                    <div className="relative">
                        <Spotlight
                            className="-top-5 left-10 md:left-0 md:-top-20"
                            fill="#F58327"
                        />
                        <Video />
                        {console.log(`http://localhost/Backend/Create${profilePic}`)}
                        <div className="flex items-center justify-center space-x-4 mt-4">
                            <div>
                                <div className="flex items-center pl-32">
                                    {/* ShadCN Avatar */}
                                    <Avatar className="w-16 h-16">
                                        <img
                                            // src={profilePic}
                                            src={`http://localhost/Backend/Create${profilePic}`}
                                            
                                            alt={`${username}'s profile`}
                                            className="rounded-full"
                                        />
                                    </Avatar>
                                    <h1 className="md:text-4xl text-2xl lg:text-4xl font-bold text-black relative z-20">
                                        Welcome, {username}
                                    </h1>
                                </div>
                                <div className="w-[40rem] h-33 left-10 relative">
                                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[2px] w-3/4 blur-sm" />
                                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-red-500 to-transparent h-[5px] w-1/4 blur-sm" />
                                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                className="md:col-span-5 h-[33rem]"
            />

            {/* Combined Awards and Smart Locker Access Item */}
            <BentoGridItem
                className="md:col-span-5 h-[35rem]"
                header={
                    <div className="flex flex-col md:flex-row gap-4 h-full">
                        <div className="flex-1">
                            <BentoGridItem
                                title="Awards"
                                description="Achievements and recognitions."
                                header={
                                    <HeroHighlight>
                                        <Section
                                            heading="Awards"
                                            pills={[
                                                {
                                                    label: "Top Contributor",
                                                    description:
                                                        "Helped 100 users find lost items.",
                                                    icon: "trophy",
                                                },
                                                {
                                                    label: "Best Finder",
                                                    description:
                                                        "Found 50 lost items.",
                                                    icon: "medal",
                                                },
                                            ]}
                                        />
                                    </HeroHighlight>
                                }
                                className="h-full"
                                icon={
                                    <IconTrophy className="h-4 w-4 text-neutral-500" />
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <BentoGridItem
                                title="Smart Locker Access"
                                description="Access to smart locker details."
                                header={
                                    <HeroHighlight>
                                        <Section
                                            heading="Smart Locker"
                                            pills={[
                                                {
                                                    label: "Locker 12",
                                                    description:
                                                        "Access granted.",
                                                    icon: "box",
                                                },
                                            ]}
                                        />
                                    </HeroHighlight>
                                }
                                className="h-full"
                                icon={
                                    <IconBox className="h-4 w-4 text-neutral-500" />
                                }
                            />
                        </div>
                    </div>
                }
            />

            {/* Statistics Overview Item */}
            <BentoGridItem
                title="Statistics Overview"
                description="Statistics of items found and lost."
                header={
                    <div>
                        <div className="absolute">
                            <SparklesCore
                                id="tsparticlesfullpage"
                                background="transparent"
                                minSize={0.6}
                                maxSize={1.4}
                                particleDensity={100}
                                className="w-full h-full"
                                particleColor="#FFFFFF"
                            />
                        </div>
                        <div className="stats">
                            <Statistics
                                title="Total Reports"
                                stats={submissionStats?.reports_count || "0"}
                            />
                            <Statistics
                                title="Total Submissions"
                                stats={
                                    submissionStats?.submissions_count || "0"
                                }
                            />
                        </div>
                    </div>
                }
                className="md:col-span-5 h-[18rem]"
                icon={
                    <IconClipboardCopy className="h-4 w-4 text-neutral-500" />
                }
            />
        </BentoGrid>
    );
}

export default Dashboard;
