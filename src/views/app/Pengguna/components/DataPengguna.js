import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
} from 'reactstrap'
import http from 'helpers/http'
import { API_ENDPOINT, API_URL } from 'config/api'

const DataPengguna = ({ id }) => {
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    photo: '',
    tipe: '',
    pekerjaan: '',
    jenis_organisasi: '',
    tanggal_lahir: '',
    tanggal_berdiri: '',
    jenis_kelamin: '',
    email: '',
    no_telp: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    alamatLengkap: '',
  })

  useEffect(() => {
    if (id) getDataPengguna()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getDataPengguna = () => {
    http
      .get(`${API_ENDPOINT.GET_ALL_USER}/${id}`)
      .then((res) => {
        const data = res.data.data
        setDataUser({
          name: data.name,
          username: data.username,
          photo: data.photo,
          tipe: data.tipe,
          pekerjaan: data.pekerjaan,
          jenis_organisasi: data.jenis_organisasi,
          tanggal_lahir: data.tanggal_lahir,
          tanggal_berdiri: data.tanggal_berdiri,
          jenis_kelamin: data.jenis_kelamin,
          email: data.email,
          no_telp: data.no_telp,
          provinsi: data.provinsi,
          kabupaten: data.kabupaten,
          kecamatan: data.kecamatan,
          alamatLengkap: data.alamat,
        })
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }

  console.log(dataUser)
  return (
    <div>
      {/* col 1 */}
      <form className="d-flex m-4">
        <div className="col-6">
          <FormGroup>
            <Label for="namalengkap" lg={12} className="detail-pengguna-label mb-1">
              Nama Lengkap
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.name}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="email" lg={12} className="detail-pengguna-label mb-1">
              Email
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.email}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="tanggalLahir" lg={12} className="detail-pengguna-label mb-1">
              Tanggal Lahir
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.tanggal_lahir}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="Provinsi" lg={12} className="detail-pengguna-label mb-1">
              Provinsi
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.provinsi}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="alamat" lg={12} className="detail-pengguna-label mb-1">
              Alamat
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.alamatLengkap}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="foto" lg={12} className="detail-pengguna-label mb-1">
              Foto Profil
            </Label>
            <Col lg={12}>
              <img src={`${API_URL}/${dataUser.photo}`} width={100} height={100} alt="" />
            </Col>
          </FormGroup>
        </div>

        {/* col 2 */}
        <div className="col-6">
          <FormGroup>
            <Label for="username" lg={12} className="detail-pengguna-label mb-1">
              Username
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.username}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="metodePembayaran" lg={12} className="detail-pengguna-label mb-1">
              No. Telepon
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.no_telp ? `+62${dataUser.no_telp}` : "-"}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="nominalDonasi" lg={12} className="detail-pengguna-label mb-1">
              Jenis Kelamin
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.jenis_kelamin}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="kota" lg={12} className="detail-pengguna-label mb-1">
              Kota/Kabupaten
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.kabupaten}</p>
            </Col>
          </FormGroup>

        </div>
        {/* col 3 */}
        <div className="col-6">
          <FormGroup>
            <Label for="jenisAkun" lg={12} className="detail-pengguna-label mb-1">
              Jenis Akun
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.tipe}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="pekerjaan" lg={12} className="detail-pengguna-label mb-1">
              Pekerjaan
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.pekerjaan}</p>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="nominalDonasi" lg={12} className="detail-pengguna-label mb-1">
              Kecamatan
            </Label>
            <Col lg={12}>
              <p className="detail-pengguna-text">{dataUser.kecamatan}</p>
            </Col>
          </FormGroup>
        </div>
        <div className="button-box mt-4">
          {/* {ubahData ?
            (<button className='button-simpan'
              type='submit'>
              simpan
            </button>) :
            (<button className='button-ubah-data' onClick={(e) => {
              e.preventDefault()
              setUbahData(true)
            }}>
              Ubah Data
            </button>)} */}
        </div>
      </form>
    </div>
  )
}

export default DataPengguna