import React, { useState } from 'react';
import './submit.css'; // Import the CSS file

function Submit() {
    const [submitted, setSubmitted] = useState(false);

    // Function to handle the button click
    const handleSubmit = () => {
        setSubmitted(true);
        // You can add your form submission logic here
        console.log('Form submitted!');
    };

    return (
        <div className="submit">
            {/* Conditional rendering of message after submit */}
            {submitted ? (
                <p>Form Submitted!</p>
            ) : (
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
            )}
        </div>
    );
}

export default Submit;
