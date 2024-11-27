import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge"; // For statuses
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import axios from "axios";

const MessageInbox = () => {
    // State to store messages
    const [messages, setMessages] = useState([]);
    // State to store loading status
    const [loading, setLoading] = useState(true);
    // State to store any error that might occur during fetching
    const [error, setError] = useState(null);

    const user_id = sessionStorage.getItem("user_id");

    // Fetch messages from the backend when the component mounts
    useEffect(() => {
        // Fetch messages from the PHP backend
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost/Backend/Create/messages.php?user_id=${user_id}`); // Update this with your actual endpoint
                const data = await response.json();

                if (response.ok) {
                    setMessages(data); // Set the data received from the backend
                } else {
                    setError("Failed to fetch messages.");
                }
            } catch (err) {
                setError("An error occurred while fetching messages.");
            } finally {
                setLoading(false); // Set loading to false when the fetch is complete
            }
        };

        fetchMessages(); // Call the function to fetch messages
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Show loading text while messages are being fetched
    }

    if (error) {
        return <div>{error}</div>; // Show error if something goes wrong
    }
    // Function to dynamically generate the message body content
    // const generateMessageBody = (message) => {

    //     if (message.status === "approved") {
    //         return `Hi ${message.username}, your claim for some  "${message.category}" has been Approved. You can collect it.`;
    //     } else if(message.status === "rejected")
    //      {
    //         return `Hi ${message.username}, your claim for some  "${message.category}" has been Rejected.`;
    //     }
         
    //     else {
    //         return `Hi ${message.username}, your claim for some  "${message.category}" is still Pending. Please check back later.`;
    //     }
    // };

       

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold">Messages</h1>
                <Input
                    type="search"
                    placeholder="Search messages..."
                    className="w-full sm:w-1/3 mt-2 sm:mt-0"
                />
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Message List */}
                <div className="w-full bg-gray-50 border-r border-gray-200 overflow-y-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={clsx(
                                "p-4 flex flex-col gap-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100",
                                !message.read && "bg-indigo-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {/* <Avatar
                                    src={message.avatar}
                                    alt="Admin"
                                    size="sm"
                                    className="rounded-full"
                                /> */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 truncate">
                                        {message.category}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">
                                        {message.message} {/* Dynamically generated content */}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge
                                        className={clsx(
                                            message.status === "Approved" && "bg-green-100 text-green-800",
                                            message.status === "Rejected" && "bg-red-100 text-red-800"
                                           // message.status === "Pending" && "bg-yellow-100 text-yellow-800"
                                        )}
                                    >
                                        {message.status}
                                    </Badge>
                                    <span className="block text-xs text-gray-400 mt-1">
                                        {message.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageInbox;
