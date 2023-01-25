import moment from 'moment'

export const orderOptions = [{ label: `Terbaru` }, { label: `Terlama` }]

export const pageSizes = [20, 50, 100]

export const orderDataByDate = (option, data) => {
    let array
    if (option === 'Terbaru') {
      array = data.sort(function (a, b) {
        return moment(b.tanggal_dibuat, "DD/MM/YYYY HH:mm") - moment(a.tanggal_dibuat, "DD/MM/YYYY HH:mm")
      })
    } else if (option === 'Terlama') {
      array = data.sort(function (a, b) {
        return moment(a.tanggal_dibuat, "DD/MM/YYYY HH:mm") - moment(b.tanggal_dibuat, "DD/MM/YYYY HH:mm")
      })
    }
    return array
  }

export const orderDataById = (option, data) => {
    let array
    if (option === 'Terbaru') {
      array = data.sort(function (a, b) {
        return b.id - a.id
      })
    } else if (option === 'Terlama') {
      array = data.sort(function (a, b) {
        return a.id - b.id
      })
    }
    return array
  }
