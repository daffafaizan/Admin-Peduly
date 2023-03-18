import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
} from 'reactstrap'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'

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

  console.log(data)
  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <div className="col-12">
        <form onSubmit={ubahRekeningPengguna} className="position-relative">
          <div>
            <FormGroup className='rekening-form-group'>
              <Label for="bankName" lg={12} className="detail-pengguna-label mb-1">
                Nama Bank
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="bankName" type="text" className="detail-pengguna-input form-input" onChange={(e) =>
                  setData({ ...data, namaBank: e.target.value })
                } placeholder="Nama bank pengguna..." value={data.namaBank} />) : (<p className="detail-pengguna-text"> {data.namaBank !== null ? data.namaBank : '-'}</p>)}
              </Col>
            </FormGroup>

            <FormGroup className='rekening-form-group'>
              <Label for="email" lg={12} className="detail-pengguna-label mb-1">
                No. Rekening
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="noRekening" type="number" className="detail-pengguna-input form-input" onChange={(e) =>
                  setData({ ...data, noRekening: e.target.value })
                } placeholder="No. rekening pengguna..." value={data.noRekening} />) : (<p className="detail-pengguna-text"> {data.noRekening !== null ? data.noRekening : '-'}</p>)}
              </Col>
            </FormGroup>

            <FormGroup className='rekening-form-group'>
              <Label for="pemilikiRekening" lg={12} className="detail-pengguna-label mb-1">
                Pemilik Rekening
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="noRekening" type="text" className="detail-pengguna-input form-input" onChange={(e) =>
                  setData({ ...data, pemilikRekening: e.target.value })
                } placeholder="Pemilik rekening..." value={data.pemilikRekening} />) : (<p className="detail-pengguna-text">{data.pemilikRekening !== null ? data.pemilikRekening : '-'}</p>)}
              </Col>
            </FormGroup>
          </div>

          <div className="button-box">
            {ubahData ? (<button className='button-simpan'
              type='submit'>simpan</button>) : (<button className='button-ubah-data' onClick={(e) => {
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