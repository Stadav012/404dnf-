import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const SubmitFound = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    file: null,
    name: "",
    photo_url: "",
  });

  const [locations, setLocations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "/api/Backend/Read/view_locations.php",
          {
            params: {
              id: sessionStorage.getItem("user_id"),
            },
            headers: {
              "Content-Type": "application/json",
            },
          },
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

  const handleFileChange = async (files) => {
    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file...");
      const response = await axios.post(
        "/api/Backend/Create/upload_image.php",
        formData,
        {
          params: {
            id: sessionStorage.getItem("user_id"),
            action: "submit",
          },
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        console.log("File uploaded successfully:", response.data.file_url);
        setFormData((prevData) => ({
          ...prevData,
          file: file,
          photo_url: response.data.file_url,
        }));
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

    const data = {
      category: formData.category,
      description: formData.description,
      location_id: formData.location,
      photo_url: formData.file ? formData.photo_url : "",
      name: formData.name,
    };

    try {
      const response = await axios.post(
        "/api/Backend/Create/submit_found.php",
        data,
        {
          params: {
            id: sessionStorage.getItem("user_id"),
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setMessage("Found item submitted successfully!");
        setFormData({
          category: "",
          description: "",
          location: "",
          file: null,
          name: "",
          photo_url: "",
        });
      } else {
        setMessage(response.data.message || "Failed to submit found item.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting the found item.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Submit a Found Item
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        {message && (
          <div
            className={`${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } p-4 rounded mb-4`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">
              Upload an Image
            </label>
            <FileUpload
              id="file"
              onChange={(files) => handleFileChange(files)}
              accept="image/*"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  category: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                {formData.category || "Select Category"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Stationery">Stationery</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the found item in detail"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Location</label>
            <Select
              value={formData.location}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  location: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                {formData.location || "Select Location"}
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem
                    key={location.location_id}
                    value={location.location_id}
                  >
                    {location.location_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Found Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitFound;
