import React from 'react'

const MiniCard2 = ({ title, text, icon }) => {
  return (
    <div className="card mini-card-2">
      <div className="section-1">
        <span className="title">{title}</span>
        <span className="text">{text}</span>
      </div>
      <div className="section-2">{icon}</div>
    </div>
  )
}

export default MiniCard2
