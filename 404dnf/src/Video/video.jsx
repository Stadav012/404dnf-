//this component is responsible for playing short videos in a loop
// it is also responsible for allowing users to select a video,pplay next, play previous
import React, { useState, useRef, useEffect } from 'react';
import './video.css'; // Import the CSS file

function Video() {
  const videoRef = useRef(null);

  // List of video URLs from the public/videos folder
  const videos = [
    '/videos/sunny.mp4',
    '/videos/butterfly.mp4',
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current video index

  // Handling video change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play(); 
    }
  }, [currentIndex]);


  return (
    <div className="video-container">

      {/* Video Player */}
      <video
        ref={videoRef}
        src={videos[currentIndex]} // Videos that I added to the public folder
        //controls
        loop
        muted
        autoPlay
      >
        Your browser does not support the video tag.
      </video>

      
    </div>
  );
}
export default Video;


//ideally animated videos 