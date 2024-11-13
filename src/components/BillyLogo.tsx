import React from 'react';

const BillyLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`billy-logo-container ${className}`}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="billy-logo"
      >
        <circle cx="30" cy="30" r="29" fill="#4A90E2" />
        <circle cx="30" cy="30" r="24" fill="white" />
        <circle cx="22" cy="24" r="4" fill="#4A90E2" className="billy-eye left-eye" />
        <circle cx="38" cy="24" r="4" fill="#4A90E2" className="billy-eye right-eye" />
        <path
          d="M20 34C20 34 25 40 30 40C35 40 40 34 40 34"
          stroke="#4A90E2"
          strokeWidth="3"
          strokeLinecap="round"
          className="billy-smile"
        />
        <path
          d="M10 25C10 25 15 20 20 20M50 25C50 25 45 20 40 20"
          stroke="#4A90E2"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="30" cy="30" r="28" stroke="#4A90E2" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default BillyLogo;