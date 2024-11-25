import React, { useState } from 'react';
import './submit.css'; // Import the CSS file
import axios from 'axios';

function Submit({ formData }) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    console.log(formData);

    // function handling the button click, posting form data to the backend
    const handleSubmit = async () => {

        //  trying to deal with the file object in the payload
        // let base64File = null;
        // if (formData.file) {
        //     base64File = await convertFileToBase64(formData.file);
        // }

        // Prepare JSON payload
        // const payload = {
        //     ...formData,
        //     file: base64File, // Add the Base64-encoded file
        // };

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

    // Helper function to convert file to Base64
    // const convertFileToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result); // File content in Base64
    //         reader.onerror = (error) => reject(error);
    //         reader.readAsDataURL(file);
    //     });
    // };

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
