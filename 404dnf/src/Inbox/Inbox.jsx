import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Inbox = () => {
    const [items, setItems] = useState([]); // State to hold the transformed data
    const [loading, setLoading] = useState(true); // State for loading spinner

    // get the userid from the session storage
    const userId = sessionStorage.getItem("user_id");

    // Fetch and transform data
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const response = await axios.get(
                    "http://localhost/Backend/Read/inbox.php",
                    {
                        params: { user_id: userId }, // Pass the user ID as a query parameter
                        withCredentials: true,
                    }
                );

                // console.log("API Response:", response.data);

                // Ensure `reported_items` exists and is an array
                const reportedItems = response.data?.reported_items || [];
                if (!Array.isArray(reportedItems)) {
                    throw new Error(
                        "Invalid API response: reported_items is not an array"
                    );
                }

                // Transform the data
                const transformedData = reportedItems.flatMap((report) =>
                    report.matching_found_items.map((item, index) => ({
                        id: `${report.report_id}-${index}`, // Generate unique IDs
                        name: item.found_item,
                        image: item.found_photo,
                        category: report.category,
                        description: `${item.found_item} (reported: ${report.item_description})`,
                    }))
                );
                console.log("Transformed Data:", transformedData);

                // display the image url
                // console.log("Image URL:", transformedData[0].image);
                setItems(transformedData); // Update the state with transformed data
            } catch (error) {
                console.error("Error fetching data:", error.message || error);
            } finally {
                setLoading(false); // Turn off loading spinner
            }
        };

        fetchData();
    }, []);
    

    if (loading) {
        return <div className="text-center">Loading...</div>; // Show a loader while fetching
    }

    // if (items.length === 0) {
    //     return <div className="text-center text-gray-600">There is currently nothing in your inbox.</div>;
    // }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M2.003 5.884l8-4a1 1 0 01.994 0l8 4A1 1 0 0119 6.764v6.472a1 1 0 01-.503.879l-8 4a1 1 0 01-.994 0l-8-4A1 1 0 011 13.236V6.764a1 1 0 011.003-.88zM11 10V7H9v3H6l4 4 4-4h-3z" />
                </svg>
                <p className="text-lg font-medium">There is currently nothing in your inbox.</p>
                <p className="text-sm text-gray-500 mt-1">Check back later for updates.</p>
            </div>
        );
    }
    

    return (
        <div className="p-6">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className="relative"
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: Math.random() * 0.2,
                        }}
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
                                    onClick={() => handleClaim(item.id)}

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
