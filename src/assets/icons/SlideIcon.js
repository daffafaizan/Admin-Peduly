import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom';

const SlideIcon = () => {
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
        d="M12 29.333h8c6.666 0 9.333-2.666 9.333-9.333v-8c0-6.667-2.666-9.334-9.333-9.334h-8c-6.667 0-9.334 2.667-9.334 9.334v8c0 6.666 2.667 9.333 9.334 9.333z"
      />
      <path
        stroke={
          // pathName === '/app/transaksi-donasi' ||
          isHovered ? '#E7513B' : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 13.333A2.667 2.667 0 1012 8a2.667 2.667 0 000 5.333zM3.56 25.267l6.573-4.414c1.054-.706 2.574-.626 3.52.187l.44.387c1.04.893 2.72.893 3.76 0l5.547-4.76c1.04-.894 2.72-.894 3.76 0l2.173 1.866"
      />
    </svg>
  )
}

export default SlideIcon
