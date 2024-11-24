import React from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

// Dummy JSON data
const dummyData = [
    {
        id: 1,
        name: "Wallet",
        image: "https://via.placeholder.com/150",
        category: "Accessories",
        description: "A black leather wallet found near the library.",
    },
    {
        id: 2,
        name: "Smartphone",
        image: "https://via.placeholder.com/150",
        category: "Electronics",
        description: "A silver smartphone found in the cafeteria.",
    },
    {
        id: 3,
        name: "Water Bottle",
        image: "https://via.placeholder.com/150",
        category: "Utilities",
        description: "A blue water bottle found in the gym.",
    },
    {
        id: 4,
        name: "Laptop",
        image: "https://via.placeholder.com/150",
        category: "Electronics",
        description: "A black laptop found in the library.",
    },
    {
        id: 5,
        name: "Headphones",
        image: "https://via.placeholder.com/150",
        category: "Accessories",
        description: "A white headphone found in the cafeteria.",
    },
    {
        id: 6,
        name: "Notebook",
        image: "https://via.placeholder.com/150",
        category: "Stationery",
        description: "A blue notebook found in the gym.",
    },
    {
        id: 7,
        name: "Watch",
        image: "https://via.placeholder.com/150",
        category: "Accessories",
        description: "A silver watch found in the library.",
    },
    {
        id: 8,
        name: "Bag",
        image: "https://via.placeholder.com/150",
        category: "Accessories",
        description: "A black bag found in the cafeteria.",
    },
    {
        id: 9,
        name: "Jacket",
        image: "https://via.placeholder.com/150",
        category: "Clothing",
        description: "A blue jacket found in the gym.",
    },
    {
        id: 10,
        name: "Sunglasses",
        image: "https://via.placeholder.com/150",
        category: "Accessories",
        description: "A black sunglasses found in the library.",
    },
];

const Inbox = () => {
    return (
        <div className="p-6">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {dummyData.map((item) => (
                    <motion.div
                        key={item.id}
                        className="relative"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: item.id * 0.1 }}
                    >
                        <Card className="shadow-lg hover:shadow-xl transition duration-300">
                            <CardHeader>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-32 w-full object-cover rounded-t-md"
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription className="text-sm text-gray-600">
                                    Category: {item.category}
                                </CardDescription>
                                <p className="mt-2 text-gray-700">
                                    {item.description}
                                </p>
                                <Button
                                    variant="secondary"
                                    className="mt-4 w-full"
                                >
                                    Claim
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Parallax effect using Bento Grid */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                    className="w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 opacity-60"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "10%",
                        translate: "-50%",
                    }}
                    animate={{
                        x: [0, 10, -10, 0],
                        y: [0, 15, -15, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
};

export default Inbox;
