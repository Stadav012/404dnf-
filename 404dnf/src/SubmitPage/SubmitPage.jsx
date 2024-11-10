import React from "react";
import ImageUpload from "../upload_image/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "./SubmitPage.css";
// import ImageUpload from '../upload_image/ImageUpload';
import Submit from "../Submit/submit";
("use client");

const SubmitPage = () => {
  return (
    <div class="submit-page-content">
      <form action="">
        <h2>Submit found item</h2>
        <p>Please fill in the details you found</p>

        <Input type="text" id="item-name" placeholder="Item name" />

        <div id="image-upload">
          <h3>Upload image</h3>
          <ImageUpload />
        </div>

        <div id="categories">
          <h3>What category of item is this?</h3>
          <div id="item-category">{/* add the categories */}</div>
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
