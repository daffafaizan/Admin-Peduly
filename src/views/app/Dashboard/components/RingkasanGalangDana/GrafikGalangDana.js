import React from 'react'
import BarSingle from 'components/charts/BarSingle'

import './index.scss'

const GrafikGalangDana = ({ barChartData }) => {
  return (
    <div className="card grafik-galang-dana">
      <div className="d-flex title-container">
        <h1 className="card-title">Grafik Galang Dana</h1>
        <h2 className="date">12 Des 2022 - 18 Des 2022</h2>
      </div>
      <div className="chart-container">
        <BarSingle shadow data={barChartData} />
      </div>
    </div>
  )
}

export default GrafikGalangDana
