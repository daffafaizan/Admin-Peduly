import React from 'react'

const MiniCard = ({ judul, text }) => {
  return (
    <div className="card mini-card-1">
      <span className="count">{text}</span>
      <span className="title">{judul}</span>
    </div>
  )
}

export default MiniCard
