import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
} from 'reactstrap'
import Select from 'react-select'
import { API_ENDPOINT } from 'config/api'
import http from 'helpers/http'
import { API_URL } from 'config/api'
import { customStyles } from '../../../../assets/css/SelectStyle'

const optionsStatus = [
  {
    value: "verified",
    label: "Verified",
  },
  {
    value: "rejected",
    label: "Not Verified"
  }
]

const VerifikasiPengguna = ({ id }) => {
  // const [preview, setPreview] = useState('')
  const [ubahData, setUbahData] = useState(false)
  const [data, setData] = useState({
    status: '',
    fotoKTP: '',
    fotoDiriKTP: ''
  })

  useEffect(() => {
    if (id) getVerifikasiPengguna()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getVerifikasiPengguna = () => {
    http
      .get(`${API_ENDPOINT.GET_ALL_USER}/${id}/verifikasi`)
      .then((res) => {
        const data = res.data.data
        setData({
          status: data.status_verifikasi
        })
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }


  const ubahVerifikasiPengguna = (e) => {
    e.preventDefault()
    http
      .put(`${API_ENDPOINT.GET_ALL_USER}/${id}/verifikasi`, {
        status_akun: data.status
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
    setUbahData(false)
  }

  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <form onSubmit={ubahVerifikasiPengguna}>
        <FormGroup className="mb-4">
          <Label for="namalengkap" lg={12} className="detail-pengguna-label mb-1 ml-3">
            Status Verifikasi Akun
          </Label>
          <Col lg={12}>
            {ubahData ? (<Select
              classNamePrefix="select"
              className="col-7"
              styles={customStyles}
              placeholder="Pilih Status"
              defaultValue={data.status ? { value: data.status, label: data.status } : "pilih status"}
              name="color"
              value={
                optionsStatus.value === null ? '' : optionsStatus.value
              }
              isSearchable={false}
              options={optionsStatus}
              onChange={(e) => {
                setData({ ...data, status: e.value })
              }
              }
            />) : (<p className="detail-pengguna-text col-8 mt-2 pb-2 text-status"> {data.status !== null ? data.status : '-'}</p>)}

          </Col>
        </FormGroup>
        <div className="form-img-box">
          <FormGroup className="col-4 -ml-3">
            <Label for="exampleFile" lg={12} className="detail-pengguna-label mb-2">
              Foto KTP
            </Label>
            <Col lg={12} className="mt-2">
              {
                data.fotoKTP ? (
                  <img src={`${API_URL}/${data.fotoKTP}`} style={{
                    width: '100%',
                    objectFit: 'cover',
                  }} />
                ) :
                  (<img src={require('../../../../assets/img/nopic.png').default}
                    style={{
                      width: '200px',
                      objectFit: 'cover',
                    }} />)
              }

            </Col>
          </FormGroup>
          <FormGroup className="col-4">
            <Label for="exampleFile" lg={12} className="detail-pengguna-label mb-2">
              Foto Diri & KTP
            </Label>
            <Col lg={12} className="mt-2">
              {
                data.fotoDiriKTP ? (
                  <img src={data.fotoDiriKTP} style={{
                    width: '100%',
                    objectFit: 'cover',
                  }} />
                ) : (<img src={require('../../../../assets/img/nopic.png').default} style={{
                  width: '200px',
                  objectFit: 'cover',
                }} />)
              }
            </Col>
          </FormGroup>

        </div>
        <div className="button-box mt-4 button-md-verifikasi">
          {ubahData ?
            (<button className='button-simpan'
              type='submit'>
              simpan
            </button>) :
            (<button className='button-ubah-data' onClick={(e) => {
              e.preventDefault()
              setUbahData(true)
            }}>
              Ubah Data
            </button>)}
        </div>
      </form>
    </div>
  )
}

export default VerifikasiPengguna