export default function dayToGo(TargetDay) {
  const firstDate = new Date(TargetDay)
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(firstDate.getTime())) {
    const oneDay = 24 * 60 * 60 * 1000
    const secondDate = new Date()
    const diffDays = Math.round((firstDate - secondDate) / oneDay)
    if (diffDays <= 0) {
      return 'berakhir'
    }
    return diffDays
  }
  return 'tanpaBatas'
}
