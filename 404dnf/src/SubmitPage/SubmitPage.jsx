import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./SubmitPage.css";
import Submit from "../Submit/submit";
import { FileUpload } from "@/components/ui/file-upload";

const SubmitFound = () => {
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        location: "",
        file: null,
        name: "",
    });

    const [locations, setLocations] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch locations from the database on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost/Backend/Read/view_locations.php", {
                    params: {
                        id: sessionStorage.getItem('user_id')
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    setLocations(response.data); // Set the locations to the state
                } else {
                    setMessage("Failed to load locations.");
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
                setMessage("An error occurred while fetching locations.");
            }
        };

        fetchLocations();
    }, []);

    // handling input file to store in local directory
    const handleFileChange = async (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
    
        try {
            const response = await axios.post("http://localhost/Backend/Create/upload_image.php", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (response.data.success) {
                console.log("File uploaded successfully:", response.data.file_url);
                setFormData((prevData) => ({ ...prevData, file: file })); // Update formData with the file
            } else {
                console.error("File upload failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsSubmitting(true);
        setMessage("");

        // Construct the data to send
        const data = {
            category: formData.category,
            description: formData.description,
            location_id: formData.location,
            photo_url: formData.file ? formData.file.name : "", // Send file name or URL
            name: formData.name,
        };

        try {
            // posting data to the endpoint as JSON
            const response = await axios.post("http://localhost/Backend/Create/submit_found.php", data, {
                params: {
                    id: sessionStorage.getItem('user_id')
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                setMessage("Item submitted successfully!");

                // preparing form for next submission
                setFormData({
                    category: "",
                    description: "",
                    location: "",
                    file: null,
                });
            } else {
                setMessage(response.data.message || "Failed to submit item.");
            }
        } catch (error) {
            setMessage("An error occurred while submitting the item.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-page-content">
            <form onSubmit={handleSubmit}>
                <h2>Submit Found Item</h2>
                <p>Please provide as much detail as possible.</p>

                {message && <p className="message">{message}</p>}

                {/* Input for Item Name */}
                <Input
                    type="text"
                    name="name"
                    placeholder="Item name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* File Upload Section */}
                <div id="image-upload">
                    <h3>Upload Image</h3>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Item Category Dropdown */}
                <div id="categories">
                    <h3>What category of item is this?</h3>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-2 rounded w-full max-w-md"
                    >
                        <option value="">Select</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="stationery">Stationery</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                {/* Additional Information Textarea */}
                <div id="additional-info">
                    <h3>Additional Information</h3>
                    <Textarea
                        name="description"
                        placeholder="Add any additional information"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Location Dropdown */}
                <div id="locations">
                    <h3>Where was it found?</h3>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border p-2 rounded w-full max-w-md"
                    >
                        <option value="">Select Location</option>
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <Submit formData={formData} onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Found Item"}
                </Submit>
            </form>
        </div>
    );
};

export default SubmitFound;
