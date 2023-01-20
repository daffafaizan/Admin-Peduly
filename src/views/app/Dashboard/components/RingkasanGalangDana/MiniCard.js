import React from 'react'
import './index.scss'

const MiniCard = ({ judul, text }) => {
  return (
    <div className="card mini-card">
      <span className="text-danger count">{text}</span>
      <span className="text-center title">{judul}</span>
    </div>
  )
}

export default MiniCard
