import './ImageUpload.css'
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path as necessary

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Set the selected image
                setImageName(file.name); // Set the image name
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div className="image-upload">
            <h1>Upload Image</h1>
            <p>JPEG or PNG under 10MB</p>
            <div className='choose-img'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }} // Hide the input befor image selection
                    id="file-input"
                />
                <Button
                    variant="secondary"
                    size="default"
                    onClick={() => document.getElementById("file-input").click()} // Trigger file input click
                >
                    Choose Image
                </Button>
            </div>
            {selectedImage && (
                <div className="image-preview">
                    <p>{imageName}</p> {/* Display the name of the selected image */}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
