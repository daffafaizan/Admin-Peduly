const TextAlertDropdown = ({ text, type = 'success', className }) => {
  const globalStyle = {
    padding: '3px 12px',
    margin: '0px',
    width: 'fit-content',
  }

  const styles = {
    success: {
      background: 'rgba(52, 168, 83, 0.2)',
    },
    warning: {
      background: 'rgba(252, 174, 3, 0.2)',
    },
    danger: {
      background: 'rgba(231, 81, 59, 0.2)',
    },
  }

  const textStyles = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }

  const strokeStyles = {
    success: 'rgba(52, 168, 83, 1)',
    warning: 'rgba(252, 174, 3, 1)',
    danger: 'rgba(231, 81, 59, 1)',
  }

  return (
    <>
      <span
        className={`${textStyles[type]} rounded text-center ${className} p-2`}
        style={{ ...globalStyle, ...styles[type] }}
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
      </span>
    </>
  )
}

export default TextAlertDropdown
