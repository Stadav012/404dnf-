import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"; // Adjust as needed for exact component paths
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

import "../styles/Users.css";

const initialUsers = [
  {
    id: 1,
    username: "john_doe",
    role: "user",
    awards: 2,
    claims: 5,
    submittedLostItems: 3,
  },
  {
    id: 2,
    username: "jane_smith",
    role: "admin",
    awards: 5,
    claims: 10,
    submittedLostItems: 6,
  },
  // Add more sample users if needed
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    // Call your backend here to update the role
  };

  const handleAwardUser = (userId, newAwards) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, awards: newAwards } : user
      )
    );
    // Call your backend here to update the awards
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    // Call your backend here to delete the user
  };

  return (
    <ErrorBoundary>
      <Table className="mt-10">
        <TableBody>
          <TableRow className="text-green-900">
            <TableCell className="text-left">Username</TableCell>
            <TableCell className="text-left">Role</TableCell>
            <TableCell className="text-right">Awards</TableCell>
            <TableCell className="text-right">Claims</TableCell>
            <TableCell className="text-right">Submitted Lost Items</TableCell>
            <TableCell className="text-left">Actions</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-left">{user.username}</TableCell>
              <TableCell className="text-left">
                <Select
                  value={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger className="text-primary">
                    {user.role}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">{user.awards}</TableCell>
              <TableCell className="text-right">{user.claims}</TableCell>
              <TableCell className="text-right">
                {user.submittedLostItems}
              </TableCell>
              <TableCell className="text-left">
                <div className="flex space-x-9 actions">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        aria-label="Award User"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Award size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <UserAwardModal
                        user={selectedUser}
                        onAwardChange={(newAwards) =>
                          handleAwardUser(user.id, newAwards)
                        }
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    aria-label="Delete User"
                    onClick={() => handleDeleteUser(user.id)}
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
