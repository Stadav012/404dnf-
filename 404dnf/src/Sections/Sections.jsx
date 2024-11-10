import React from 'react';
import './Sections.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
"use client";
import { motion } from "framer-motion";
import {Highlight } from "@/components/ui/hero-highlight";


// pill component
const Pill = ({ label, description, icon }) => {
  return (
    <div className="pill">
      <div className="pill-icon">
      <i className={`fa fa-${icon}`} aria-hidden="true"></i>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="pill-content">
        <Highlight>
        <div className="pill-label">
          {label}
        </div>
        </Highlight>
        {/* <i className="fas fa-exclamation-triangle"></i> */}
        <div className="pill-description">
          {description}
        </div>
      </motion.div>
      
    </div>
  );
};

      
       
// Awards/Smartlockers or any additional headings
const Section = ({ heading, pills }) => {
  return (
    <div className="section">
      <h2>{heading}</h2>
      <div className="pill-container">
        {pills.map((pill, index) => (
          <Pill 
            key={index}
            label={pill.label}
            description={pill.description}
            icon={pill.icon}
          />
        ))}
      </div>
    </div>
  );
};

// usage of the Section component
// const App = () => {
//   const awards = [
//     { label: 'Top Contributor', description: 'You have helped 100 users find their lost items.' },
//     { label: 'Best Finder', description: 'You have found 50 lost items.' }
//   ];

//   const lockers = [
//     { label: 'View available lockers', description: 'Locker number: 12' },
//     { label: 'View available lockers', description: 'Locker number: 12' }
//   ];

//   return (
//     <div>
//       <Section heading="Awards" pills={awards} />
//       <Section heading="Smart Locker" pills={lockers} />
//     </div>
//   );
// };

export default Section;
