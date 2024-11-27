import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";

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
    const [filePreview, setFilePreview] = useState("");

    // Fetch locations from the database on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(
                    "http://169.239.251.102:3341/~daisy.tsenesa/Backend/Read/view_locations.php",
                    {
                        params: {
                            id: sessionStorage.getItem("user_id"),
                        },
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setLocations(response.data);
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

    const handleFileChange = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            axios
                .post(
                    "http://169.239.251.102:3341/~daisy.tsenesa/Backend/Create/upload_image.php",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        setFilePreview(URL.createObjectURL(file));
                        setFormData((prevData) => ({ ...prevData, file }));
                    } else {
                        setMessage("File upload failed.");
                    }
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                    setMessage("Error uploading the file.");
                });
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

        const data = {
            category: formData.category,
            description: formData.description,
            location_id: formData.location,
            photo_url: formData.file ? formData.file.name : "",
            name: formData.name,
        };

        try {
            const response = await axios.post(
                "http://169.239.251.102:3341/~daisy.tsenesa/Backend/Create/submit_found.php",
                data,
                {
                    params: {
                        id: sessionStorage.getItem("user_id"),
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setMessage("Item submitted successfully!");
                setFormData({
                    category: "",
                    description: "",
                    location: "",
                    file: null,
                    name: "",
                });
                setFilePreview("");
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
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Submit Found Item</h2>
                    <p className="text-gray-600">
                        Please provide as much detail as possible.
                    </p>
                </CardHeader>
                <CardContent>
                    {message && <p className="text-red-500 mb-4">{message}</p>}

                    <Input
                        type="text"
                        name="name"
                        placeholder="Item name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mb-4"
                    />

                    <div className="mb-4">
                        <h3 className="font-semibold">Upload Image</h3>
                        <FileUpload
                            onFileSelect={(file) => handleFileChange(file)}
                            filePreview={filePreview}
                        />
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold">
                            What category of item is this?
                        </h3>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="stationery">Stationery</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold">
                            Additional Information
                        </h3>
                        <Textarea
                            name="description"
                            placeholder="Add any additional information"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold">Where was it found?</h3>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option
                                    key={location.location_id}
                                    value={location.location_id}
                                >
                                    {location.location_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={cn("w-full md:w-auto", {
                            "opacity-50": isSubmitting,
                        })}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Found Item"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SubmitFound;
