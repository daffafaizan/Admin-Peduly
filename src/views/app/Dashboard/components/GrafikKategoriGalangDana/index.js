import BarSingle, { defaultOption } from 'components/charts/BarSingle'
import { ThemeColors } from 'helpers/ThemeColors'
import React from 'react'
import './index.scss'

const color = ThemeColors()

/* eslint-disable no-unused-vars */
const GrafikKategoriGalangDana = ({ datas = [] }) => {
  const getCurrentGrafikData = () => {
    return {
      labels: datas?.map((value) => {
        return value.category
      }),
      datasets: [
        {
          label: 'Total Galang Dana',
          data: datas?.map((value) => {
            return value.data.length
          }),
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
