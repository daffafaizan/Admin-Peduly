import BarSingle, { defaultOption } from 'components/charts/BarSingle'
import { ThemeColors } from 'helpers/ThemeColors'
import React, { useEffect, useState } from 'react'
import './index.scss'

const color = ThemeColors()

/* eslint-disable no-unused-vars */
const GrafikKategoriGalangDana = ({
  categoryData = [],
  galangDanaData = [],
}) => {
  const [totalGalangDanaData, setTotalGalangDanaData] = useState([])

  useEffect(() => {
    setTotalGalangDanaData(
      categoryData?.map((value) => {
        // random data test
        const startData = 0
        const endData = 100
        return Math.floor(Math.random() * (endData - startData + 1)) + startData
      })
    )
  }, [categoryData])

  const getCurrentGrafikData = () => {
    return {
      labels: categoryData?.map((value) => {
        return value.title
      }),
      datasets: [
        {
          label: 'Total Galang Dana',
          data: totalGalangDanaData,
          backgroundColor: color.themeColor1_10,
          borderColor: color.themeColor1,
          borderWidth: 2,
          datalabels: {
            align: 'end',
            anchor: 'end',
          },
        },
      ],
    }
  }

  return (
    <div className="card grafik-kategori-galang-dana">
      <div className="header-section">
        <h3 className="card-title">Grafik Kategori Galang Dana</h3>
      </div>
      <div className="body-section">
        <div className="chart-container">
          <BarSingle
            data={getCurrentGrafikData()}
            options={{ ...defaultOption, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  )
}

export default GrafikKategoriGalangDana
