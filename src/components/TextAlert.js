import React from 'react'

const TextAlert = ({ text, type = 'success', className }) => {
  const styles = {
    success: {
      background: 'rgba(52, 168, 83, 0.2)',
      padding: '3px 12px',
      margin: '0px',
      width: 'fit-content',
    },
    danger: {
      background: 'rgba(231, 81, 59, 0.2)',
      padding: '3px 12px',
      margin: '0px',
      width: 'fit-content',
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
      style={styles[type]}
    >
      {text}
    </p>
  )
}

export default TextAlert
