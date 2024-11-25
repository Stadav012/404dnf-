"use client";

import { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import loadingAnimation from "../public/animations/loading.json";
import Video from "./Video/video";
import Statistics from "./Statistics/Statistics";
import Section from "./Sections/Sections";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
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

    // Simulate data loading or API calls
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false); // Set to false after data is fetched
        }, 2000);

        return () => clearTimeout(timeout); // Cleanup timeout
    }, []);

    const awards = [
        {
            label: "Top Contributor",
            description: "You have helped 100 users find their lost items.",
            icon: "trophy",
        },
        {
            label: "Best Finder",
            description: "You have found 50 lost items.",
            icon: "medal",
        },
    ];

    const lockers = [
        {
            label: "View available lockers",
            description: "Locker number: 12",
            icon: "box",
        },
        {
            label: "View available lockers",
            description: "Locker number: 12",
            icon: "compass",
        },
    ];

    if (loading) {
        return <Loader />;
    }

    return (
        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[30rem] gap-y-24 p-5">
            {/* Video Item */}
            <BentoGridItem
                header={
                    <div>
                        <Spotlight
                            className="-top-5 left-0 md:left-60 md:-top-20"
                            fill="#F58327"
                        />
                        <Video />
                        <div>
                            <h1 className="md:text-4xl text-2xl lg:text-4xl font-bold text-center text-black relative z-20">
                                Welcome {sessionStorage.getItem("username")}
                            </h1>
                            <div className="w-[40rem] h-30 relative">
                                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
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
                                            pills={awards}
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
                                            pills={lockers}
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
                            <Statistics title="Total Items Found" stats="100" />
                            <Statistics title="Total Items Lost" stats="30" />
                        </div>
                    </div>
                }
                className="md:col-span-5 h-[18rem]"
                icon={<IconTrophy className="h-4 w-4 text-neutral-500" />}
            />
        </BentoGrid>
    );
}

export default Dashboard;
