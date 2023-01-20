import React, { useState } from 'react'

import './index.scss'
import moment from 'moment'
import { getMonthBetween } from 'helpers/getMonthBetween'
import { ThemeColors } from 'helpers/ThemeColors'
import BarSingle, { defaultOption } from 'components/charts/BarSingle'
import DatesBetweenInput from 'components/DatesBetweenInput'

/* eslint-disable no-unused-vars */
const GrafikTotalDonasi = ({ barChartData }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const getCurrentDataset = () => {
    const dateList = getMonthBetween(startDate, endDate)

    const color = ThemeColors()
    return {
      labels: dateList?.map((date) => {
        return moment(date, 'MM-YYYY').format('MMMM YYYY')
      }),
      datasets: [
        {
          label: 'Total Donation',
          data: dateList?.map((date) => {
            // random data test
            const startData = 100000
            const endData = 10000000
            return (
              Math.floor(Math.random() * (endData - startData + 1)) + startData
            )
          }),
          backgroundColor: color.themeColor1_10,
          borderColor: color.themeColor1,
          borderWidth: 2,
          datalabels: {
            display: false,
          },
        },
      ],
    }
  }

  return (
    <div className="card grafik-galang-dana">
      <div className="d-flex title-container">
        <h3 className="card-title">Grafik Total Donasi</h3>
        <DatesBetweenInput
          initialStart={moment().subtract(6, 'months').toDate()}
          initialEnd={moment().toDate()}
          onChange={(start, end) => {
            setStartDate(start)
            setEndDate(end)
          }}
        />
      </div>
      <div className="chart-container">
        <BarSingle
          data={getCurrentDataset()}
          options={{ ...defaultOption, maintainAspectRatio: false }}
        />
      </div>
    </div>
  )
}

export default GrafikTotalDonasi
