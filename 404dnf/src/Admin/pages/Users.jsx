import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
    TableCaption,
    TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { Trash, Award, Eye } from "lucide-react"; // Import Eye for view icon
import UserAwardModal from "@/components/ui/UserAwardModal";
import UserDetailsModal from "./UserDetailsModal";
import ErrorBoundary from "./ErrorBoundary";

import axios from "axios";
import "../styles/Users.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from backend
        axios
            .get("http://localhost/Backend/Read/view_users.php", {
                withCredentials: true,
            })
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load users. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleRoleChange = (userId, newRole) => {
        // Update the role in the backend
        axios
            .post(
                "http://localhost/Backend/Create/updateUserRole.php",
                { user_id: userId, role: newRole },
                { withCredentials: true }
            )
            .then((response) => {
                if (response.data.status === "success") {
                    setUsers(
                        users.map((user) =>
                            user.user_id === userId
                                ? { ...user, role: newRole }
                                : user
                        )
                    );
                } else {
                    console.error(
                        "Failed to update role:",
                        response.data.message
                    );
                }
            })
            .catch((error) => {
                console.error("Error updating role:", error);
            });
    };

    const handleAwardUser = (userId, newAwards) => {
        // Update awards in the backend
        setUsers(
            users.map((user) =>
                user.user_id === userId ? { ...user, awards: newAwards } : user
            )
        );
        // Call backend if needed
    };

    const handleDeleteUser = (userId) => {
        // Delete user from backend
        axios
            .post(
                "http://localhost/Backend/Create/delete_user.php",
                { user_id: userId },
                { withCredentials: true }
            )
            .then((response) => {
                if (response.data.status === "success") {
                    setUsers(users.filter((user) => user.user_id !== userId));
                } else {
                    console.error(
                        "Failed to delete user:",
                        response.data.message
                    );
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <ErrorBoundary>
            <Table className="min-w-full table-auto">
                <TableCaption>A list of users and their actions.</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="w-[150px] p-3 text-left">
                            Username
                        </TableHead>
                        <TableHead className="w-[120px] p-3 text-left">
                            Role
                        </TableHead>
                        <TableHead className="text-right w-[120px] p-3">
                            Awards
                        </TableHead>
                        <TableHead className="text-right w-[120px] p-3">
                            Claims
                        </TableHead>
                        <TableHead className="text-right w-[120px] p-3">
                            Reports
                        </TableHead>
                        <TableHead className="text-right w-[120px] p-3">
                            Submissions
                        </TableHead>
                        <TableHead className="text-left px-20">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.user_id}
                            className="hover:bg-gray-50"
                        >
                            <TableCell className="font-medium p-3">
                                {user.username}
                            </TableCell>
                            <TableCell className="p-3">
                                <Select
                                    value={user.role}
                                    onValueChange={(value) =>
                                        handleRoleChange(user.user_id, value)
                                    }
                                >
                                    <SelectTrigger className="text-primary">
                                        {user.role}
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regular">
                                            User
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell className="text-right p-3">
                                {user.awards || 0}
                            </TableCell>
                            <TableCell className="text-right p-3">
                                {user.claims || 0}
                            </TableCell>
                            <TableCell className="text-right p-3">
                                {user.reports || 0}
                            </TableCell>
                            <TableCell className="text-right p-3">
                                {user.submittedLostItems || 0}
                            </TableCell>
                            <TableCell className="px-20">
                                <div className="flex space-x-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                aria-label="View User"
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
                                                className="bg-blue-500 text-white hover:bg-blue-400"
                                            >
                                                <Eye size={20} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <UserDetailsModal
                                                user={selectedUser}
                                            />
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                aria-label="Award User"
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
                                                className="bg-yellow-500 text-white hover:bg-yellow-400"
                                            >
                                                <Award size={20} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <UserAwardModal
                                                user={selectedUser}
                                                onAwardChange={(newAwards) =>
                                                    handleAwardUser(
                                                        user.user_id,
                                                        newAwards
                                                    )
                                                }
                                            />
                                        </DialogContent>
                                    </Dialog>

                                    <Button
                                        aria-label="Delete User"
                                        onClick={() =>
                                            handleDeleteUser(user.user_id)
                                        }
                                        variant="destructive"
                                        className="bg-red-500 text-white hover:bg-red-400"
                                    >
                                        <Trash size={20} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-gray-100">
                        <TableCell
                            colSpan={6}
                            className="font-semibold text-right p-3"
                        >
                            Total Users
                        </TableCell>
                        <TableCell className="text-right p-3">
                            {users.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </ErrorBoundary>
    );
};

export default Users;
