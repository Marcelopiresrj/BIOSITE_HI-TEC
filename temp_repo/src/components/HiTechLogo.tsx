import React from 'react';

interface HiTechLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const HiTechLogo: React.FC<HiTechLogoProps> = ({
  className = 'w-full h-auto',
  showSubtitle = true,
}) => {
  return (
    <svg
      viewBox="0 0 330 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 5 Green Pixel Squares (Top-Right, aligned above ECH) */}
      <g id="top-pixel-squares">
        <rect x="202" y="8" width="15" height="15" rx="2" fill="#52a623" />
        <rect x="224" y="8" width="15" height="15" rx="2" fill="#62bd2b" />
        <rect x="246" y="8" width="15" height="15" rx="2" fill="#72d334" />
        <rect x="268" y="8" width="15" height="15" rx="2" fill="#62bd2b" />
        <rect x="290" y="8" width="15" height="15" rx="2" fill="#52a623" />
      </g>

      {/* Main Brand Name Text: Centered with ample breathing room on left & right */}
      <text
        x="165"
        y="72"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Plus Jakarta Sans', 'Outfit', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="70"
        letterSpacing="-1.5px"
      >
        Hi-TECH
      </text>

      {/* 5 Green Pixel Squares (Bottom-Left, aligned below Hi-) */}
      <g id="bottom-pixel-squares">
        <rect x="24" y="84" width="15" height="15" rx="2" fill="#72d334" />
        <rect x="45" y="84" width="15" height="15" rx="2" fill="#62bd2b" />
        <rect x="66" y="84" width="15" height="15" rx="2" fill="#72d334" />
        <rect x="87" y="84" width="15" height="15" rx="2" fill="#62bd2b" />
        <rect x="108" y="84" width="15" height="15" rx="2" fill="#52a623" />
      </g>

      {/* Subtitle: "informática/eletrônicos" under TECH */}
      {showSubtitle && (
        <text
          x="226"
          y="96"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="700"
          fontSize="13.8"
          letterSpacing="0.2px"
        >
          informática/eletrônicos
        </text>
      )}
    </svg>
  );
};
