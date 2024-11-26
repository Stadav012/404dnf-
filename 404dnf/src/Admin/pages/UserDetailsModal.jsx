// UserDetailsModal.js
import React from "react";

const UserDetailsModal = ({ user }) => {
    if (!user) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold">User Details</h2>
            <div className="mt-4">
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
                <p>
                    <strong>Awards:</strong> {user.awards || 0}
                </p>
                <p>
                    <strong>Claims:</strong> {user.claims || 0}
                </p>
                <p>
                    <strong>Reports:</strong> {user.reports || 0}
                </p>
                <p>
                    <strong>Submissions:</strong> {user.submittedLostItems || 0}
                </p>
                {/* Add other user details here */}
            </div>
        </div>
    );
};

export default UserDetailsModal;
