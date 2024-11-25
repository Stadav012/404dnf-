import React, { useState } from "react";
import { Search } from "lucide-react"; // Icon
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // For statuses
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

// Mock Data
const messages = [
    {
        id: 1,
        subject: "Lost Wallet Found",
        content:
            "A black leather wallet was found near the library. Does this match your description?",
        status: "Approved",
        time: "10:15 AM",
        avatar: "https://via.placeholder.com/150",
        read: false,
    },
    {
        id: 2,
        subject: "Claim for Blue Backpack",
        content:
            "Your claim for the blue backpack has been denied. It doesn't match the description.",
        status: "Denied",
        time: "Yesterday",
        avatar: "https://via.placeholder.com/150",
        read: true,
    },
    {
        id: 3,
        subject: "Lost Phone Found",
        content:
            "A Samsung Galaxy S20 was found at the gym. Is this your phone?",
        status: "Pending",
        time: "2 Days Ago",
        avatar: "https://via.placeholder.com/150",
        read: true,
    },
];

const MessageInbox = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between p-4 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold">Admin Messages</h1>
                <Input
                    type="search"
                    placeholder="Search messages..."
                    className="w-full sm:w-1/3 mt-2 sm:mt-0"
                />
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                {/* Message List */}
                <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            onClick={() => setSelectedMessage(message)}
                            className={clsx(
                                "p-4 flex flex-col gap-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100",
                                !message.read && "bg-indigo-50"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src={message.avatar}
                                    alt="Admin"
                                    size="sm"
                                    className="rounded-full"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 truncate">
                                        {message.subject}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">
                                        {message.content}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge
                                        className={clsx(
                                            message.status === "Approved" &&
                                                "bg-green-100 text-green-800",
                                            message.status === "Denied" &&
                                                "bg-red-100 text-red-800",
                                            message.status === "Pending" &&
                                                "bg-yellow-100 text-yellow-800"
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

                {/* Message Detail */}
                <div className="flex-1 p-4 overflow-y-auto bg-white">
                    {selectedMessage ? (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between border-b pb-4">
                                <div>
                                    <h2 className="text-lg font-bold">
                                        {selectedMessage.subject}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Sent by Admin
                                    </p>
                                </div>
                                <Badge
                                    className={clsx(
                                        selectedMessage.status === "Approved" &&
                                            "bg-green-100 text-green-800",
                                        selectedMessage.status === "Denied" &&
                                            "bg-red-100 text-red-800",
                                        selectedMessage.status === "Pending" &&
                                            "bg-yellow-100 text-yellow-800"
                                    )}
                                >
                                    {selectedMessage.status}
                                </Badge>
                            </div>
                            <p className="text-gray-700 whitespace-pre-line">
                                {selectedMessage.content}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-10">
                            Select a message to view its details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageInbox;
