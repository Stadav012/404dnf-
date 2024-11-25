import React from "react";
import ImageUpload from "../upload_image/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./SubmitPage.css";
// import ImageUpload from '../upload_image/ImageUpload';
import Submit from "../Submit/submit";
import { FileUpload } from "@/components/ui/file-upload";

const SubmitPage = () => {
    const handleFileSelect = (file) => {
        setFormData((prevData) => ({ ...prevData, file }));
    };
    return (
        <div className="submit-page-content">
            <form action="">
                <h2>Submit found item</h2>
                <p>Please fill in the details you found</p>

                <Input type="text" id="item-name" placeholder="Item name" />

                <div id="image-upload">
                    <h3>Upload image</h3>
                    {/* <ImageUpload /> */}
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileSelect} />
                    </div>
                </div>

                <div id="categories">
                    <h3>What category of item is this?</h3>
                    <div id="item-category">
                        {/* add the categories */}
                        <select
                            id="category-dropdown"
                            className="border p-2 rounded w-full max-w-md"
                        >
                            <option value="">Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="furniture">Stationery</option>
                            <option value="books">Accessories</option>
                        </select>
                    </div>
                </div>

                {/* add the additional information text */}
                <div id="additional-info">
                    <h3>Additional information</h3>
                    <Textarea
                        id="additional-info-text"
                        placeholder="Add additional information"
                    />
                </div>
                <div id="submit-btn">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SubmitPage;
