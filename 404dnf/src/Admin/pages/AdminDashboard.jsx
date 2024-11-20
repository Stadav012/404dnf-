import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

import ComponentChar from "../components/ComponentChar";

import { CardStack } from "@/components/ui/card-stack";

import { cn } from "@/lib/utils";

import { ReactNode } from "react";

const AdminDashboard = () => {
    return (
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[28rem] mt-20">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
};
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const CardsAdmin = () => {
    return (
        <div className="h-[40rem] flex items-center justify-center w-full">
            <CardStack items={CARDS} />
        </div>
    );
};
const items = [
    {
        header: <ComponentChar />,
        className: "md:col-span-2",
    },
    {
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        header: <CardsAdmin />,
        className: "md:col-span-2",
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
];

// Small utility to highlight the content of specific section of a testimonial content

const Highlight = ({ children, className }) => {
    return (
        <span
            className={cn(
                "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
                className
            )}
        >
            {children}
        </span>
    );
};

const CARDS = [
    {
        id: 0,
        name: "Manu Arora",
        designation: "Senior Software Engineer",
        content: (
            <p>
                Simply amazing,{" "}
                <Highlight>Nothing more, nothing less</Highlight> no cap. Who
                would have thought that I would find my nice pink purse🙏
            </p>
        ),
    },
    {
        id: 1,
        name: "Elon Musk",
        designation: "Senior Shitposter",
        content: (
            <p>
                This has been by faaaaaar,{" "}
                <Highlight>the best platform to find my stufff</Highlight>{" "}
                anywhere. I would definitely recommend if you are{" "}
                <Highlight>me</Highlight> and lose stuff easily
            </p>
        ),
    },
    {
        id: 2,
        name: "Tyler Durden",
        designation: "Manager Project Mayhem",
        content: (
            <p>
                Rule number 1 of college
                <Highlight>Create a 404DNF account</Highlight> You wont ever
                regret it. The second rule
                <Highlight>Find stuff</Highlight> I got a lot of merchandise and
                swag from this and I love it.
            </p>
        ),
    },
];

export default AdminDashboard;
