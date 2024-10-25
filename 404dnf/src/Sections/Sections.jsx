import React from 'react';
import './Sections.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// pill component
const Pill = ({ label, description, icon }) => {
  return (
    <div className="pill">
      <i className={`fa fa-${icon} pill-icon`}></i>
      <div className="pill-label">
        {label}
      </div>
      <div className="pill-description">
        {description}
      </div>
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
