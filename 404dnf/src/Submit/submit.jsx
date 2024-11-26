import React, { useState } from 'react';
import './submit.css'; // Import the CSS file
import axios from 'axios';

function Submit({ formData }) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    console.log(formData);

    // function handling the button click, posting form data to the backend
    const handleSubmit = async () => {

        try {
            // sending data to the server as json, including the file
            const response = await axios.post("http://localhost/Backend/Create/report.php", formData, {
                headers: {
                    "Content-Type": "application/json", 
                },
            });

            // handling submission success
            if (response.data.success) {
                setSubmitted(true);
                console.log("Form successfully submitted:", response.data);
            } else {
                throw new Error(response.data.message || "Submission failed.");
            }
        } catch (err) {
            // handling an arising error
            setError(err.message);
            console.error("Error submitting form:", err);
            console.error("Error message:", err.message); 
            console.error("Error name:", err.name);
        }
    };

    return (
        <div className="submit">
            {/* Conditional rendering of message after submit */}
            {submitted ? (
                <p>Form Successfully Submitted!</p>
            ) : (
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
            )}
        </div>
    );
}

export default Submit;
