import React from 'react'

const MiniCard2 = ({ title, subtitle, text, icon }) => {
  return (
    <div className="card mini-card-2">
      <div className="mini-card-2-section-1">
        <span className="title">{title}</span>
        <span className="subtitle">{subtitle}</span>
        <span className="text">{text}</span>
      </div>
      <div className="mini-card-2-section-2">{icon}</div>
    </div>
  )
}

export default MiniCard2
