import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const PenggunaIcon = () => {
  const location = useLocation()
  const pathName = location.pathname
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
          pathName === '/app/pengguna' || isHovered ? '#E7513B' : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 16a6.667 6.667 0 100-13.333A6.667 6.667 0 0016 16zM27.453 29.333C27.453 24.173 22.32 20 16 20c-6.32 0-11.453 4.173-11.453 9.333"
      />
    </svg>
  )
}

export default PenggunaIcon
