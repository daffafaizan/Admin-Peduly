import moment from 'moment'

export const getMonthBetween = (start, end) => {
  const dateList = []
  let currentDate = moment(start)
  while (currentDate.isSameOrBefore(end)) {
    dateList.push(currentDate.format('MM-YYYY'))
    currentDate.add(1, 'months')
  }

  return dateList
}
