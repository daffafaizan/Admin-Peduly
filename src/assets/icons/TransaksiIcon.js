import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const TransaksiIcon = () => {
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
          pathName === '/app/transaksi-donasi' || isHovered
            ? '#E7513B'
            : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 29.333h8c6.666 0 9.333-2.666 9.333-9.333v-8c0-6.667-2.666-9.334-9.333-9.334h-8c-6.667 0-9.334 2.667-9.334 9.334v8c0 6.666 2.667 9.333 9.334 9.333z"
      />
      <path
        stroke={
          pathName === '/app/transaksi-donasi' || isHovered
            ? '#E7513B'
            : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.773 19.32l3.174-4.12a1.338 1.338 0 011.88-.24l2.44 1.92a1.349 1.349 0 001.88-.226l3.08-3.974"
      />
    </svg>
  )
}

export default TransaksiIcon
