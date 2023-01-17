import React from 'react'
import './index.scss'

const MiniCard = ({ judul, text }) => {
  return (
    <div className="card mini-card">
      <div className="ghost"></div>
      <p className="text-danger text-center content">{text}</p>
      <p className="text-center judul">{judul}</p>
    </div>
  )
}

export default MiniCard
