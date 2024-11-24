import React, { useState } from "react";
import "./claims.css";

const ClaimsManagement = () => {
  // Dummy data for claims
  const [claims, setClaims] = useState([
    {
      id: 1,
      item: "Laptop",
      claimedBy: "John Doe",
      status: "pending", // Default status
      description: "Black Dell XPS 13 laptop with a scratched top cover",
      location: "Room 205, Main Building",
    },
    {
      id: 2,
      item: "Wallet",
      claimedBy: "Jane Smith",
      status: "pending", // Default status
      description: "Brown leather wallet containing ID and cards",
      location: "Cafeteria",
    },
  ]);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      )
    );
  };

  return (
    <div className="claims-management-page">
      <h1>Claims Management</h1>
      <p>Manage claims submitted by users below.</p>

      <table className="claims-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Claimed By</th>
            <th>Status</th>
            <th>Description</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.item}</td>
              <td>{claim.claimedBy}</td>
              <td>                <span className={`status-label ${claim.status}`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </span>

              </td>
              <td>{claim.description}</td>
              <td>{claim.location}</td>
              <td>
              <select
                  value={claim.status}
                  onChange={(e) => handleStatusChange(claim.id, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsManagement;
