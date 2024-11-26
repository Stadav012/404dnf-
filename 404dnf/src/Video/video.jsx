import React, { useState, useRef, useEffect } from "react";
import "./video.css"; // Import the CSS file

function Video() {
    const videoRef = useRef(null);

    // List of video URLs from the public/videos folder
    const videos = ["/videos/butterfly.mp4", "/videos/sunny.mp4"];

    const [currentIndex, setCurrentIndex] = useState(0); // Track the current video index

    // Handling video change
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [currentIndex]);

    // Load video based on theme session storage
    useEffect(() => {
        const theme = sessionStorage.getItem("theme");
        if (theme === "vid1") {
            setCurrentIndex(0);
        } else if (theme === "vid2") {
            setCurrentIndex(1);
        }
    }, []);

    // Handle video end to loop without lag
    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; // Restart the video without delay
            videoRef.current.play(); // Play the video immediately
        }
    };

    return (
        <div className="video-container">
            {/* Video Player */}
            <video
                ref={videoRef}
                src={videos[currentIndex]} // Videos that I added to the public folder
                loop
                preload="auto"
                muted
                autoPlay
                onEnded={handleVideoEnd} // Reset and play immediately after the end
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Video;
