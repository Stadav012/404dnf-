
import React, { useState } from 'react';
import './ImageUpload.css'

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Set the image as base64 string
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div className="image-upload">
             <h1>Upload Image</h1>
             <p>JPEG or PNG under 10MB</p>
            <div className='choose-img'><input type="file" accept="image/*" onChange={handleImageChange} /></div>
            {selectedImage && (
                <div className="image-preview">
                    <h3>Image Preview:</h3>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

// npm install tailwindcss postcss autoprefixer
// npm install react-ripples
