import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
} from 'reactstrap'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'
import { customStyles } from '../../../../assets/css/SelectStyle'
import Select from 'react-select'

const bankList = [
  {
    value: 1,
    label: 'Bank Mandiri',
  },
  {
    value: 2,
    label: 'Bank Syariah Indonesia (BSI)',
  },
  {
    value: 3,
    label: 'Bank Negara Indonesia (BNI)',
  },
  {
    value: 4,
    label: 'Bank Rakyat Indonesia (BRI)',
  },
  {
    value: 5,
    label: 'Bank Central Asia (BCA)',
  },
  {
    value: 6,
    label: 'Bank Tabungan Negara (BTN)',
  },
  {
    value: 7,
    label: 'CIMB Niaga',
  },
  {
    value: 8,
    label: 'CIMB Niaga Syariah',
  },
  {
    value: 9,
    label: 'Bank Danamon',
  },
  {
    value: 10,
    label: 'Bank Danamon Syariah',
  },
  {
    value: 11,
    label: 'Bank Muamalat',
  },
  {
    value: 12,
    label: 'Bank Bukopin',
  },
]

const RekeningPengguna = ({ id }) => {
  const [ubahData, setUbahData] = useState(false)
  const [data, setData] = useState({
    namaBank: '',
    noRekening: '',
    pemilikRekening: ''
  })
  const [fetchStatus, setFetchStatus] = useState(false)

  useEffect(() => {
    if (id) getRekeningPengguna()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getRekeningPengguna = () => {
    http
      .get(`${API_ENDPOINT.GET_ALL_USER}/${id}/rekening`)
      .then((res) => {
        const dataRekening = res.data.data
        setData({
          namaBank: dataRekening.bank_name,
          noRekening: dataRekening.bank_account_number,
          pemilikRekening: dataRekening.bank_account_name
        })
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }

  const ubahRekeningPengguna = (e) => {
    e.preventDefault()
    http
      .put(`${API_ENDPOINT.GET_ALL_USER}/${id}/rekening`, {
        bank_name: data.namaBank,
        bank_account_number: data.noRekening,
        bank_account_name: data.pemilikRekening
      })
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
    setUbahData(false)
    setFetchStatus(true)
  }

  useEffect(() => {
    if (fetchStatus) {
      getRekeningPengguna()
      setFetchStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  function validator() {
    if (data.noRekening && data.namaBank && data.pemilikRekening) return true
    return false
  }

  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <div className="col-12">
        <form onSubmit={ubahRekeningPengguna} className="position-relative">
          <div className="col-12">
            <FormGroup className='rekening-form-group'>
              <Label for="bankName" lg={12} className="detail-pengguna-label mb-1">
                Nama Bank
              </Label>
              <Col lg={12}>
                {ubahData ? (<Select
                  classNamePrefix="select"
                  className="col-12 p-0 m-0"
                  styles={customStyles}
                  placeholder="Pilih Bank"
                  defaultValue={data.namaBank ? { value: data.namaBank, label: data.namaBank } : "Pilih Bank"}
                  name="color"
                  value={bankList.value === null ? '' : bankList.value}
                  isSearchable={false}
                  options={bankList}
                  onChange={(e) => {
                    setData({ ...data, namaBank: e.label })
                  }
                  } />) : (<p className="detail-pengguna-rekening text-rekening"> {data.namaBank !== null ? data.namaBank : '-'}</p>)}
              </Col>
            </FormGroup>

            <FormGroup className='rekening-form-group'>
              <Label for="email" lg={12} className="detail-pengguna-label mb-1">
                No. Rekening
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="noRekening" type="number" className="detail-pengguna-input form-input text-rekening" onChange={(e) =>
                  setData({ ...data, noRekening: e.target.value })
                } placeholder="No. rekening pengguna..." value={data.noRekening} />) : (<p className="detail-pengguna-rekening text-rekening"> {data.noRekening !== null ? data.noRekening : '-'}</p>)}
              </Col>
            </FormGroup>

            <FormGroup className='rekening-form-group'>
              <Label for="pemilikiRekening" lg={12} className="detail-pengguna-label mb-1">
                Pemilik Rekening
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="noRekening" type="text" className="detail-pengguna-input form-input text-rekening" onChange={(e) =>
                  setData({ ...data, pemilikRekening: e.target.value })
                } placeholder="Pemilik rekening..." value={data.pemilikRekening} />) : (<p className="detail-pengguna-rekening text-rekening">{data.pemilikRekening !== null ? data.pemilikRekening : '-'}</p>)}
              </Col>
            </FormGroup>
          </div>

          <div className="button-box col-12 mt-4 button-md-box">
            {ubahData ? (validator() ? (<button className='button-simpan'
              type='submit'>simpan</button>) : (<button className='button-simpan-disabled'
                disabled>simpan</button>)) : (<button className='button-ubah-data' onClick={(e) => {
                  e.preventDefault()
                  setUbahData(true)
                }}>Ubah Data</button>)}
          </div>

        </form>
      </div>
    </div>
  )
}

export default RekeningPengguna