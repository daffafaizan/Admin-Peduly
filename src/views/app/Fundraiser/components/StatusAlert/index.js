import { useState, useRef, useEffect } from 'react'
import './index.scss'

const TextAlertDropdown = ({ text, type = 'Approved', className, status, fundraiserId, id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const globalStyle = {
    padding: '3px 12px',
    margin: '0px',
    width: 'fit-content',
  }

  const styles = {
    Approved: {
      background: 'rgba(52, 168, 83, 0.2)',
    },
    Pending: {
      background: 'rgba(252, 174, 3, 0.2)',
    },
    Rejected: {
      background: 'rgba(231, 81, 59, 0.2)',
    },
  }

  const textStyles = {
    Approved: 'text-success',
    Pending: 'text-warning',
    Rejected: 'text-danger',
  }

  const strokeStyles = {
    Approved: 'rgba(52, 168, 83, 1)',
    Pending: 'rgba(252, 174, 3, 1)',
    Rejected: 'rgba(231, 81, 59, 1)',
  }

  const dropdownStyle = {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    zIndex: 9999,
    display: dropdownOpen ? 'block' : 'none',
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
    console.log(fundraiserId)
    console.log(id)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={`${textStyles[type]} rounded text-center ${className} p-2 border-0`}
        style={{ ...globalStyle, ...styles[type] }}
        onClick={(e) => {
          e.stopPropagation()
          toggleDropdown()
        }}
      >
        {text}
        <span className="ml-1">
          <svg
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0.759766L6.88384 4.87593C6.39773 5.36204 5.60227 5.36204 5.11616 4.87593L1 0.759766"
              stroke={strokeStyles[type]}
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {dropdownOpen && (
        <div
          className="dropdown-content"
          style={dropdownStyle}
          ref={dropdownRef}
        >
          {status.map((item, index) => (
            <li key={index} onClick={(e) => e.stopPropagation()}>
              {item}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default TextAlertDropdown
