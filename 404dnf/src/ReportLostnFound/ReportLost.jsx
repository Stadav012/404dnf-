import React, { useState, useEffect } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component
import { Input } from "@/components/ui/input"; // Import Input component
import "./ReportLost.css";
import Sidebar from "../sidebar/Sidebar";
import Submit from "../Submit/submit";
import { FileUpload } from "@/components/ui/file-upload";

const ReportLost = () => {
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        color: "",
        size: "",
        location: "",
        file: null,
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
    
        // Construct the data as a JSON object
        const data = {
            category: formData.category,
            item_description: formData.description,
            location_id: formData.location, 
            photo_url: formData.file ? formData.file.name : "", // Send the file name or URL if already uploaded
        };
    
        try {
            // Post data to the endpoint as JSON
            const response = await axios.post("http://localhost/Backend/Create/report.php", data, {
                params: {
                    id: sessionStorage.getItem('user_id')
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.data.success) {
                setMessage("Report submitted successfully!");

                // clear form, ready for the next form entry
                setFormData({
                    category: "",
                    description: "",
                    color: "",
                    size: "",
                    location: "",
                    file: null,
                });
            } else {
                setMessage(response.data.message || "Failed to submit report.");
            }
        } catch (error) {
            setMessage("An error occurred while submitting the report.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="report-lost-page">
            <Sidebar />
            <main className="report-content">
                <h1>Report a Lost Item</h1>
                <p>Please provide as much detail as possible.</p>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="clothing">Clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="stationery">Stationery</option>
                        <option value="accessories">Accessories</option>
                    </select>

                    <label htmlFor="description">Description</label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the lost item"
                    />

                    <label htmlFor="color">Color</label>
                    <Input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="e.g., Red"
                    />

                    <label htmlFor="size">Size (optional)</label>
                    <Input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="e.g., S, M, L"
                    />

                    <label htmlFor="location">Where was it lost?</label>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="">Select Location</option>
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>


                    <Submit formData={formData} onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Submit>
                </form>
            </main>
        </div>
    );
};

export default ReportLost;
