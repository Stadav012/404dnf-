import React, { useState, useEffect } from "react";
import axios from "axios";
import "./claims.css";

const ClaimsManagement = () => {
  const [claims, setClaims] = useState([]); // Initialize as an empty array
  const [error, setError] = useState("");

  // Fetch claims from the backend
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get("/api/Backend/claims.php", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setClaims(response.data);
    } catch (err) {
      console.error("Error fetching claims:", err);
      setError("Failed to fetch claims.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const previousStatus = claims.find((claim) => claim.claim_id === id)?.status;

    try {
      await axios.put(
        "/api/Backend/claims.php",
        {
          claim_id: id,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the status in the UI after a successful request
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.claim_id === id ? { ...claim, status: newStatus } : claim
        )
      );
    } catch (err) {
      console.error("Error updating claim status:", err);
      setError("Failed to update claim status.");

      // Revert the status to the previous value in case of error
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.claim_id === id ? { ...claim, status: previousStatus } : claim
        )
      );
    }
  };

  return (
    <div className="claims-management-page">
      <h1>Claims Management</h1>
      <p>Manage claims submitted by users below.</p>

      {error && <p className="error-message">{error}</p>}

      <table className="claims-table">
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Report_Description</th>
            <th>Submission_Description</th>
            <th>Reports_Photo</th>
            <th>Submissions_Photo</th>
             <th>Location</th>
            <th>Username</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.length > 0 ? (
            claims.map((claim) => (
              <tr key={claim.claim_id}>
                {console.log(claim)}
                <td>{claim.claim_id}</td>
                
                <td>{claim.item_description}</td>
                <td>{claim.submission_description}</td>
                <td><img src={`/api/uploads/reports/${claim.report_photo_url}`} alt="Report" /></td>
                <td><img src={`/api/uploads/submit/${claim.submission_photo_url}`} alt="Submission" /></td>
                <td>{claim.location_name || "N/A"}</td>
                <td>{claim.username}</td>
                <td>
                  <span className={`status-label ${claim.status}`}>
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  </span>
                </td>
                <td>
                  <select
                    value={claim.status}
                    onChange={(e) =>
                      handleStatusChange(claim.claim_id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No claims available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimsManagement;
