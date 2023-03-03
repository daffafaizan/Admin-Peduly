import moment from 'moment'
import { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

const DateFormat = {
  months: 'MMMM YYYY',
  days: 'DD, MMMM YYYY',
}

const DatesRangePicker = ({
  initialStart,
  initialEnd,
  dateType = 'months' || 'days',
  gap = 1,
  onChange,
}) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  useEffect(() => {
    const initializeData = () => {
      if (initialStart) {
        setStartDate(initialStart)

        if (!initialEnd || moment(initialStart).isAfter(moment(initialEnd))) {
          setEndDate(moment(initialStart).add(gap, dateType).toDate())
          return
        }

        setEndDate(initialEnd)
        return
      }

      if (initialEnd) {
        setEndDate(initialEnd)
        setStartDate(moment(initialEnd).subtract(gap, dateType).toDate())
        return
      }

      setEndDate(moment().toDate())
      setStartDate(moment().subtract(gap, dateType).toDate())
    }

    initializeData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onChange) onChange(startDate, endDate)
  }, [startDate, endDate, onChange])

  const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
    <button className="button-date" onClick={onClick} ref={ref}>
      {moment(value).format(DateFormat[dateType])}
    </button>
  ))

  CustomDateButton.displayName = 'Custom Date Button'

  const handleChangeStart = (value) => {
    setStartDate(value)

    if (moment(value).add(gap, dateType).isSameOrAfter(endDate)) {
      setEndDate(moment(value).add(gap, dateType).toDate())
    }
  }

  const handleChangeEnd = (value) => {
    setEndDate(value)

    if (moment(value).subtract(gap, dateType).isSameOrBefore(startDate)) {
      setStartDate(moment(value).subtract(gap, dateType).toDate())
    }
  }

  return (
    <div className="dates-between-input">
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleChangeStart}
          showMonthYearPicker
          customInput={<CustomDateButton />}
        />
      </div>
      <span> - </span>
      <div>
        <DatePicker
          selected={endDate}
          onChange={handleChangeEnd}
          showMonthYearPicker
          customInput={<CustomDateButton />}
        />
      </div>
    </div>
  )
}

export default DatesRangePicker
