import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"; // Adjust paths as needed
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { Trash, Award } from "lucide-react";
import UserAwardModal from "@/components/ui/UserAwardModal";
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
            <Table className="mt-10">
                <TableHead>
                    <TableRow className="text-green-900">
                        <TableCell className="text-left">Username</TableCell>
                        <TableCell className="text-left">Role</TableCell>
                        <TableCell className="text-right">Awards</TableCell>
                        <TableCell className="text-right">Claims</TableCell>
                        <TableCell className="text-right">
                            Submitted Lost Items
                        </TableCell>
                        <TableCell className="text-left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.user_id}>
                            <TableCell className="text-left">
                                {user.username}
                            </TableCell>
                            <TableCell className="text-left">
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
                            <TableCell className="text-right">
                                {user.awards || 0}
                            </TableCell>
                            <TableCell className="text-right">
                                {user.claims || 0}
                            </TableCell>
                            <TableCell className="text-right">
                                {user.submittedLostItems || 0}
                            </TableCell>
                            <TableCell className="text-left">
                                <div className="flex space-x-9 actions">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                aria-label="Award User"
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
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
                                    >
                                        <Trash size={20} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ErrorBoundary>
    );
};

export default Users;
