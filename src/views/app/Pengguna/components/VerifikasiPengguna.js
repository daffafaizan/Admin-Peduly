import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { API_ENDPOINT } from 'config/api'
import http from 'helpers/http'
import { API_URL } from 'config/api'

const optionsStatus = [
  {
    value: "verified",
    label: "Verified",
  },
  {
    value: "rejected",
    label: "Ditolak"
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
  const [imageKTP, setImageKTP] = useState(data.fotoKTP ? handleImg(data.fotoKTP || '') : '')
  const [imageDiriKTP, setImageDiriKTP] = useState(data.fotoDiriKTP ? handleImg(data.fotoDiriKTP || '') : '')

  const handleImg = (image) => {
    return image.includes('https')
      ? image
      : `${API_URL}${image.includes('/') ? image : `/images/images_profile/${image}`
      }`
  }

  // console.log(handleImg(data.fotoKTP))

  const onImageKTPChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setData({ ...data, fotoKTP: event.target.files[0] })
      setImageKTP(URL.createObjectURL(event.target.files[0]))
    }
  }

  const onImageDiriKTPChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setData({ ...data, fotoDiriKTP: event.target.files[0] })
      setImageDiriKTP(URL.createObjectURL(event.target.files[0]))
    }
  }

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
          status: data.status_verifikasi,
          fotoKTP: data.verifikasi.foto_ktp,
          fotoDiriKTP: data.verifikasi.foto_diri_ktp
        })
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }

  console.log(data.status)

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

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      border: '1px solid #F4F4F4',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      zIndex: 99999,
      backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided) => ({
      ...provided,
      height: '50px',
      width: '250px',
      paddingLeft: 5,
      paddingRight: 0,
      borderRadius: 0,
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      borderBottom: '1px solid #f4f4f4',
      backgroundColor: 'transparent',
      color: '#FCAE03',
      font: 'root.font.regular',
      fontSize: '16px',
      marginTop: 1,
      boxShadow: '0 !important',
      '&:hover': {
        outline: 'none !important',
        borderColor: 'rgba(0, 0, 0, 0.3)',
      },
      '&:focus': {
        outline: 'auto 2px Highlight !important',
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
      return { ...provided, opacity, transition }
    },
  }

  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <form className="col-12" onSubmit={ubahVerifikasiPengguna}>
        <FormGroup className="mb-4">
          <Label for="namalengkap" lg={12} className="detail-pengguna-label mb-1 ml-3">
            Status Verifikasi Akun
          </Label>
          <Col lg={12}>
            {ubahData ? (<Select
              classNamePrefix="select"
              className="col-4"
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
            />) : (<p className="detail-pengguna-text col-5 mt-2 text-status"> {data.status !== null ? data.status : '-'}</p>)}

          </Col>
        </FormGroup>
        <div className="form-img-box">
          <FormGroup className="col-4 -ml-3">
            <Label for="exampleFile" lg={12} className="detail-pengguna-label mb-2">
              Foto KTP
            </Label>
            <Col lg={12} className="mt-2">
              {
                imageKTP ? (
                  <img src={imageKTP} style={{
                    width: '100%',
                    objectFit: 'cover',
                  }} />
                ) : ubahData ? (<>
                  <Input
                    id="imageKTP"
                    name="imageKTP"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onImageKTPChange}
                  />
                  <label
                    htmlFor="imageKTP"
                    className="custom-input-image d-flex justify-content-center align-items-center"
                  >
                    {imageKTP ? (
                      <img
                        src={imageKTP}
                        alt="imageKtp"
                        className="img-preview"
                      />
                    ) : (
                      <svg
                        width={33}
                        height={34}
                        viewBox="0 0 33 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4001 30.6666C23.9167 30.6666 30.0667 24.5166 30.0667 16.9999C30.0667 9.48325 23.9167 3.33325 16.4001 3.33325C8.8834 3.33325 2.7334 9.48325 2.7334 16.9999C2.7334 24.5166 8.8834 30.6666 16.4001 30.6666Z"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9336 17H21.8669"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.4004 22.4668V11.5334"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </label>
                </>) :
                  (<img src={require('../../../../assets/img/nopic.png').default}
                    style={{
                      width: '100%',
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
                imageDiriKTP ? (
                  <img src={imageDiriKTP} style={{
                    width: '100%',
                    objectFit: 'cover',
                  }} />
                ) : ubahData ? (<>
                  <Input
                    id="imageDiriKTP"
                    name="imageDiriKTP"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    hidden
                    onChange={onImageDiriKTPChange}
                  />
                  <label
                    htmlFor="imageDiriKTP"
                    className="custom-input-image d-flex justify-content-center align-items-center"
                  >
                    {imageDiriKTP ? (
                      <img
                        src={imageDiriKTP}
                        alt="Preview Image"
                        className="img-preview"
                      />
                    ) : (
                      <svg
                        width={33}
                        height={34}
                        viewBox="0 0 33 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4001 30.6666C23.9167 30.6666 30.0667 24.5166 30.0667 16.9999C30.0667 9.48325 23.9167 3.33325 16.4001 3.33325C8.8834 3.33325 2.7334 9.48325 2.7334 16.9999C2.7334 24.5166 8.8834 30.6666 16.4001 30.6666Z"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9336 17H21.8669"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.4004 22.4668V11.5334"
                          stroke="#E7513B"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </label>
                </>) : (<img src={require('../../../../assets/img/nopic.png').default} style={{
                  width: '100%',
                  objectFit: 'cover',
                }} />)
              }
            </Col>
          </FormGroup>

        </div>
        <div className="button-box mt-4">
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