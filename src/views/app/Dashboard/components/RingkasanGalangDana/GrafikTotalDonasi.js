import React, { useState } from 'react'

import './index.scss'
import moment from 'moment'
import { getMonthBetween } from 'helpers/getMonthBetween'
import { ThemeColors } from 'helpers/ThemeColors'
import BarSingle, { defaultOption } from 'components/charts/BarSingle'
import DatesBetweenInput from 'components/DatesRangePicker'

/* eslint-disable no-unused-vars */
const GrafikTotalDonasi = ({ donasiData = [] }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const getCurrentDataset = () => {
    const dateList = getMonthBetween(startDate, endDate)

    const color = ThemeColors()
    return {
      labels: dateList?.map((date) => {
        return moment(date, 'MM-YYYY').format('MMM YYYY')
      }),
      datasets: [
        {
          label: 'Total Donation',
          data: dateList?.map((date) => {
            const filteredDataByMonth = donasiData?.filter((x) => {
              return moment(x.created_at).format('MM-YYYY') === date
            })

            let totalDonasi = 0
            filteredDataByMonth?.forEach((item) => {
              totalDonasi += parseInt(item.donasi)
            })

            return totalDonasi
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
