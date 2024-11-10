
import React from 'react';
import ImageUpload from '../upload_image/ImageUpload';
import './SubmitPage.css';
// import ImageUpload from '../upload_image/ImageUpload';
"use client";

const SubmitPage = () => {
    return(
        <div class="content">
            <h2>Submit found item</h2>
            <div>
                <ImageUpload />
            </div>
        </div>
    );
};

export default SubmitPage;

