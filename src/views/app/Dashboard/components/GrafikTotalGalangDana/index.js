/* eslint-disable no-unused-vars */

import React, { useState } from 'react'

import './index.scss'
import moment from 'moment'
import { getMonthBetween } from 'helpers/getMonthBetween'
import { ThemeColors } from 'helpers/ThemeColors'
import BarSingle, { defaultOption } from 'components/charts/BarSingle'
import DatesBetweenInput from 'components/DatesRangePicker'

/* eslint-disable no-unused-vars */
const GrafikTotalGalangDana = ({ galangDanaData }) => {
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
          label: 'Total Galang Dana',
          data: dateList?.map((date) => {
            let total = 0
            galangDanaData?.forEach((value) => {
              const dateGalangDana = moment(value.created_at).format('MM-YYYY')

              if (dateGalangDana === date) {
                total += 1
              }
            })

            return total
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
    <div className="card grafik-galang-dana">
      <div className="d-flex title-container">
        <h3 className="card-title">Grafik Total Galang Dana</h3>
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
          options={{
            ...defaultOption,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  )
}

export default GrafikTotalGalangDana
