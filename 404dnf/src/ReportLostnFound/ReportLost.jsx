import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component
import { Input } from "@/components/ui/input"; // Import Input component
import "./ReportLost.css";
import Sidebar from "../sidebar/Sidebar";
import Submit from "../Submit/submit";
import ImageUpload from "../upload_image/ImageUpload";
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

    const handleFileSelect = (file) => {
        setFormData((prevData) => ({ ...prevData, file }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add any further submission logic here
    };

    // const [files, setFiles] = useState<File[]>([]);
    // const handleFileUpload = (files: File[]) => {
    //   setFiles(files);
    //   console.log(files);
    // };

    return (
        <div className="report-lost-page">
            <Sidebar />
            <main className="report-content">
                <h1>Report a Lost Item</h1>
                <p>Please provide as much detail as possible.</p>

                <form onSubmit={handleSubmit}>
                    {/* <ImageUpload onFileSelect={handleFileSelect} /> */}
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileSelect} />
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
                    <Textarea
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location details"
                    />

                    <Submit onClick={handleSubmit}>Submit report</Submit>
                </form>
            </main>
        </div>
    );
};

export default ReportLost;
