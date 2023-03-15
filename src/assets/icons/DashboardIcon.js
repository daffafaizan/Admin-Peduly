import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const DashboardIcon = () => {
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
          pathName === '/app/dashboard' || isHovered ? '#E7513B' : '#717171'
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.027 3.787l-7.187 5.6c-1.2.933-2.173 2.92-2.173 4.426v9.88c0 3.094 2.52 5.627 5.613 5.627h15.44c3.093 0 5.613-2.533 5.613-5.613V14c0-1.613-1.08-3.68-2.4-4.6l-8.24-5.773c-1.867-1.307-4.867-1.24-6.667.16zM16 23.987v-4"
      />
    </svg>
  )
}

export default DashboardIcon
