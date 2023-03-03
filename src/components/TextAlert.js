const TextAlert = ({ text, type = 'success', className }) => {
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

  return (
    <p
      className={`${textStyles[type]} rounded text-center ${className}`}
      style={{ ...globalStyle, ...styles[type] }}
    >
      {text}
    </p>
  )
}

export default TextAlert
