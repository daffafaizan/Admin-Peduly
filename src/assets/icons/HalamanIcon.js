import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom';

const HalamanIcon = () => {
  // const location = useLocation();
  // const pathName = location.pathname;
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <svg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        stroke={
          // pathName === '/app/transaksi-donasi' ||
          isHovered ? '#E7513B' : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M29.333 13.333V20c0 6.666-2.666 9.333-9.333 9.333h-8c-6.667 0-9.334-2.666-9.334-9.333v-8c0-6.667 2.667-9.334 9.334-9.334h6.666"
      />
      <path
        stroke={
          // pathName === '/app/transaksi-donasi' ||
          isHovered ? '#E7513B' : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M29.333 13.333H24c-4 0-5.334-1.333-5.334-5.333V2.667l10.667 10.666zM9.334 17.334h8M9.334 22.666h5.333"
      />
    </svg>
  )
}

export default HalamanIcon
