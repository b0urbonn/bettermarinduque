import React from 'react';

const HeartIsland: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 190"
    className={className}
    aria-hidden="true"
    focusable="false"
    fill="none"
  >
    <path
      d="M100 180C100 180 20 128 20 74C20 42 44 24 66 24C81 24 94 32 100 45C106 32 119 24 134 24C156 24 180 42 180 74C180 128 100 180 100 180Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 0"
    />
    <path
      d="M100 160C100 160 40 120 40 78"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export default HeartIsland;
