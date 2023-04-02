import React from 'react'
import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
  Input
} from 'reactstrap'
import http from 'helpers/http'
import { API_ENDPOINT, API_URL } from 'config/api'
import {
  useOptionJenisOrganisasi,
  useOptionKabupaten,
  useOptionKecamatan,
  useOptionPekerjaan,
  useOptionProvinsi,
} from 'helpers/useUbahProfile'
import { penggunaSelect } from '../../../../assets/css/SelectStyle'
import Select from 'react-select'
import UserPhotoIcon from 'assets/svg/UserPhotoIcon'

const optionsJenisAkun = [
  { value: 1, label: 'pribadi' },
  { value: 2, label: 'organisasi' },
]

const optionsJenisKelamin = [
  { value: 1, label: 'Laki laki' },
  { value: 2, label: 'Perempuan' },
]

const DataPengguna = ({ id }) => {
  const [username, setUsername] = useState("")
  const [ubahData, setUbahData] = useState(false)
  const optionsPekerjaan = useOptionPekerjaan(ubahData)
  const optionsProvinsi = useOptionProvinsi(ubahData)
  const optionsJenisOrganisasi = useOptionJenisOrganisasi(ubahData)
  const [idKabupaten, setIdKabupaidKabupaten] = useState('')
  const optionsKabupaten = useOptionKabupaten(idKabupaten)
  const [idKecamatan, setIdKecamatan] = useState('')
  const optionsKecamatan = useOptionKecamatan(idKecamatan)
  const [fetchStatus, setFetchStatus] = useState(false)
  const [usernameUnique, setUsernameUnique] = useState(false)
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
  const [fotoProfileUrl, setFotoProfileUrl] = useState(dataUser?.photo)


  useEffect(() => {
    if (id) getDataPengguna()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (fetchStatus) {
      getDataPengguna()
      setFetchStatus(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  const handleImgProfil = (image) => {
    if (!image) {
      return
    } else if (image.slice(0, 4) ===
      'http') {
      return image
    } else if (dataUser.photo.slice(0, 7) ===
      '/images') {
      return `${API_URL}/${image}`
    }
  }

  console.log(fotoProfileUrl)

  function loadImage(e) {
    const previewImage = e.target.files[0]
    setDataUser({ ...dataUser, photo: previewImage })
    if (e.target.files.length !== 0) {
      setFotoProfileUrl(URL.createObjectURL(previewImage))
    }
  }

  const handleOnEdit = (e) => {
    e.preventDefault()
    setUbahData(true)
  }


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
        setUsername(data.username)
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }

  const handleCheckUsername = () => {
    if (dataUser.username === username) setUsernameUnique(false)
    http.post(`${API_URL}/api/admin/users/${id}/check-username`, {
      username: dataUser.username
    })
      .then(() => {
        setUsernameUnique(false)
      })
      .catch(() => {
        setUsernameUnique(true)
      })
  }

  console.log(usernameUnique, username)

  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('photo', dataUser?.photo)
    data.append('name', dataUser.name)
    data.append('username', dataUser.username)
    data.append('tipe', dataUser.tipe.toLowerCase())
    if (dataUser.tipe === 'pribadi' || dataUser.tipe === 'Pribadi') {
      data.append('pekerjaan', dataUser.pekerjaan)
      data.append('tanggal_lahir', dataUser.tanggal_lahir)
      data.append('jenis_kelamin', dataUser.jenis_kelamin)
      data.append('no_telp', dataUser.no_telp)
    } else if (dataUser.tipe === 'organisasi') {
      data.append('jenis_organisasi', dataUser.jenis_organisasi)
      data.append('tanggal_berdiri', dataUser.tanggal_berdiri)
      data.append('no_telp', dataUser.no_telp)
    }
    data.append('provinsi', dataUser.provinsi)
    data.append('kabupaten', dataUser.kabupaten)
    data.append('kecamatan', dataUser.kecamatan)
    data.append('alamat', dataUser.alamatLengkap)

    http.post(`${API_ENDPOINT.GET_ALL_USER}/${id}?_method=PUT`, data)
      .then(() => {
        setFetchStatus(true)
        setUbahData(false)
      })
      .catch((e) => {
        console.log('Ubah Profil Bermasalah ', e)
      })
  }

  function validator() {
    if (dataUser.name && dataUser.username && dataUser.email && dataUser.no_telp) {
      return true
    }
    return false
  }

  return (
    <div>
      {/* col 1 */}
      <form className="m-4" onSubmit={onSubmit}>
        <div className="d-flex flex-md-row flex-sm-column">
          <div className="col-4">
            <FormGroup>
              <Label for="namalengkap" lg={12} className="detail-pengguna-label mb-1">
                Nama Lengkap
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="name" type="text" className="detail-pengguna-input form-input" onChange={(e) =>
                  setDataUser({ ...dataUser, name: e.target.value })
                } value={dataUser.name} />) : <p className="detail-pengguna-text">{dataUser.name}</p>
                }
              </Col>
            </FormGroup>

            <FormGroup>
              <Label for="email" lg={12} className="detail-pengguna-label mb-1">
                Email
              </Label>
              <Col lg={12}>
                <p className="detail-pengguna-text text-primary">{dataUser.email ? dataUser.email : '-'}</p>
              </Col>
            </FormGroup>

            <FormGroup>
              {dataUser.tipe === 'organisasi' ? (
                <>
                  <Label for="tanggalLahir" lg={12} className="detail-pengguna-label mb-1">
                    Tanggal Berdiri
                  </Label>
                  <Col lg={12}>
                    {ubahData ? (<input name="tanggalBerdiri" type="date" className="detail-pengguna-input form-input" onChange={(e) =>
                      setDataUser({ ...dataUser, tanggal_berdiri: e.target.value })
                    } value={dataUser.tanggal_berdiri} />) :
                      <p className="detail-pengguna-text">{dataUser.tanggal_berdiri ? dataUser.tanggal_berdiri : "-"}</p>
                    }
                  </Col>
                </>) : (<>
                  <Label for="tanggalLahir" lg={12} className="detail-pengguna-label mb-1">
                    Tanggal Lahir
                  </Label>
                  <Col lg={12}>
                    {ubahData ? (<input name="tanggalLahir" type="date" className="detail-pengguna-input form-input" onChange={(e) =>
                      setDataUser({ ...dataUser, tanggal_lahir: e.target.value })
                    } value={dataUser.tanggal_lahir} />) :
                      <p className="detail-pengguna-text">{dataUser.tanggal_lahir ? dataUser.tanggal_lahir : "-"}</p>
                    }
                  </Col>
                </>)}

            </FormGroup>

            <FormGroup>
              <Label for="Provinsi" lg={12} className="detail-pengguna-label mb-1">
                Provinsi
              </Label>
              <Col lg={12}>
                {ubahData ? (<Select
                  id="provinsiAlamat"
                  placeholder="Pilih Provinsi"
                  defaultValue={
                    dataUser.provinsi
                      ? { value: dataUser.provinsi, label: dataUser.provinsi }
                      : 'Pilih Provinsi'
                  }
                  value={
                    optionsProvinsi.value === null ? '' : optionsProvinsi.value
                  }
                  styles={penggunaSelect}
                  noOptionsMessage={() => 'Provinsi Tidak Ditemukan :('}
                  options={optionsProvinsi}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={false}
                  onChange={(e) => {
                    setDataUser({ ...dataUser, provinsi: e.label })
                    setIdKabupaidKabupaten(e.value)
                  }} />) :
                  <p className="detail-pengguna-text">{dataUser.provinsi ? dataUser.provinsi : "-"}</p>
                }
              </Col>
            </FormGroup>

            <FormGroup>
              <Label for="alamat" lg={12} className="detail-pengguna-label mb-1">
                Alamat
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="alamatLengkap" type="text" className="detail-pengguna-input form-input" onChange={(e) =>
                  setDataUser({ ...dataUser, alamatLengkap: e.target.value })
                } value={dataUser.alamatLengkap} />) :
                  <p className="detail-pengguna-text">{dataUser.alamatLengkap ? dataUser.alamatLengkap : "-"}</p>}
              </Col>
            </FormGroup>

            <FormGroup>
              <Label for="foto" lg={12} className="detail-pengguna-label mb-1">
                Foto Profil
              </Label>
              <Col lg={12}>
                {/* {dataUser?.photo ? (<img src={handleImgProfil(fotoProfileUrl)} className="foto-profil" alt="" />) : (<UserPhotoIcon />)}
                {ubahData && (
                  <span style={{
                    cursor: 'pointer'
                  }}>
                    <input
                      style={{ display: 'none' }}
                      multiple={false}
                      ref={profile}
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={loadImage}
                      value={dataUser?.photo}
                    />
                    <p className="text-sm text-peduly-primary mt-2 ml-2">
                      Ganti Foto
                    </p>
                  </span>
                )} */}
                <div className={`${ubahData && 'd-none'}`}>
                  {!ubahData && dataUser.photo ?
                    (<img src={handleImgProfil(dataUser?.photo)} className="foto-profil" alt="" />) : <UserPhotoIcon />
                  }
                </div>
                {ubahData && (
                  <span style={{ cursor: 'pointer' }}>
                    <Input
                      id="photoProfil"
                      name="photoProfil"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      hidden
                      onChange={loadImage}
                    />
                    <label
                      htmlFor="photoProfil"
                      className="foto-profil"
                    > {dataUser.photo ? <img
                      src={fotoProfileUrl ? fotoProfileUrl : handleImgProfil(dataUser?.photo)}
                      alt="Preview Image"
                      className="foto-profil"
                    /> : (<UserPhotoIcon />)}
                      <p className="text-sm text-peduly-primary mt-2 ml-2">
                        Ganti Foto
                      </p>
                    </label>
                  </span>
                )
                }
              </Col>
            </FormGroup>
          </div>

          {/* col 2 */}
          <div className="col-4">
            <FormGroup>
              <Label for="username" lg={12} className="detail-pengguna-label mb-1">
                Username
              </Label>
              <Col lg={12}>
                {ubahData ? (
                  <input
                    id="username"
                    className="detail-pengguna-input form-input"
                    type="text"
                    placeholder="username"
                    maxLength="50"
                    value={dataUser.username}
                    onBlur={handleCheckUsername}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, username: e.target.value })
                    }
                  />
                ) :
                  (<p className="detail-pengguna-text">{dataUser.username ? dataUser.username : "-"}</p>)}
                {usernameUnique === true && (
                  <p className="text-xs text-peduly-primary">
                    Username sudah digunakan
                  </p>
                )}
              </Col>
            </FormGroup>

            <FormGroup>
              <Label for="metodePembayaran" lg={12} className="detail-pengguna-label mb-1">
                No. Telepon
              </Label>
              <Col lg={12}>
                {ubahData ? (<input name="noTelepon" type="number" className="detail-pengguna-input form-input" onChange={(e) =>
                  setDataUser({ ...dataUser, no_telp: e.target.value })
                } value={dataUser.no_telp} />) :
                  <p className="detail-pengguna-text text-primary">{dataUser.no_telp ? `+62${dataUser.no_telp}` : "-"}</p>}
              </Col>
            </FormGroup>

            <FormGroup>
              {dataUser.tipe === 'organisasi' ? (
                <>
                  <Label for="nominalDonasi" lg={12} className="detail-pengguna-label mb-1">
                    Jenis Organisasi
                  </Label>
                  <Col lg={12}>
                    {ubahData ? (<Select
                      id="jenisOrganisasi"
                      placeholder="Pilih Jenis Organisasi"
                      defaultValue={
                        dataUser.jenis_organisasi
                          ? {
                            value: dataUser.jenis_organisasi,
                            label: dataUser.jenis_organisasi,
                          }
                          : 'Pilih Jenis Organisasi'
                      }
                      value={
                        optionsJenisOrganisasi.value === null
                          ? ''
                          : optionsJenisOrganisasi.value
                      }
                      styles={penggunaSelect}
                      noOptionsMessage={() => 'Jenis Organisasi Tidak Ditemukan :('}
                      options={optionsJenisOrganisasi}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      isSearchable={false}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, jenis_organisasi: e.label })
                      }
                    />) :
                      <p className="detail-pengguna-text">{dataUser.jenis_organisasi ? dataUser.jenis_organisasi : "-"}</p>}
                  </Col>
                </>
              ) : (<><Label for="nominalDonasi" lg={12} className="detail-pengguna-label mb-1">
                Jenis Kelamin
              </Label>
                <Col lg={12}>
                  {ubahData ? (<Select
                    id="jenisKelamin"
                    placeholder="Pilih Jenis Kelamin"
                    defaultValue={
                      dataUser.jenis_kelamin
                        ? {
                          value: dataUser.jenis_kelamin,
                          label: dataUser.jenis_kelamin,
                        }
                        : 'Pilih Jenis Kelamin'
                    }
                    value={
                      optionsJenisKelamin.value === null
                        ? ''
                        : optionsJenisKelamin.value
                    }
                    styles={penggunaSelect}
                    noOptionsMessage={() => 'Jenis Kelamin Tidak Ditemukan'}
                    options={optionsJenisKelamin}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    isSearchable={false}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, jenis_kelamin: e.label })
                    }
                  />) :
                    <p className="detail-pengguna-text">{dataUser.jenis_kelamin ? dataUser.jenis_kelamin : "-"}</p>}
                </Col>
              </>)}

            </FormGroup>

            <FormGroup>
              <Label for="kota" lg={12} className="detail-pengguna-label mb-1">
                Kota/Kabupaten
              </Label>
              <Col lg={12}>
                {ubahData ? (
                  <Select
                    id="kotaKabubatenAlamat"
                    placeholder="Pilih Kota/kabupaten"
                    defaultValue={
                      dataUser.kabupaten
                        ? { value: dataUser.kabupaten, label: dataUser.kabupaten }
                        : 'Pilih Kota/kabupaten'
                    }
                    value={
                      optionsKabupaten.value === null ? '' : optionsKabupaten.value
                    }
                    styles={penggunaSelect}
                    noOptionsMessage={() => 'Kota/Kabupatan tidak Ditemukan :('}
                    options={optionsKabupaten}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    isSearchable={false}
                    onChange={(e) => {
                      setDataUser({ ...dataUser, kabupaten: e.label })
                      setIdKecamatan(e.value)
                    }}
                  />
                ) :
                  <p className="detail-pengguna-text">{dataUser.kabupaten ? dataUser.kabupaten : "-"}</p>}
              </Col>
            </FormGroup>

          </div>
          {/* col 3 */}
          <div className="col-4">
            <FormGroup>
              <Label for="jenisAkun" lg={12} className="detail-pengguna-label mb-1">
                Jenis Akun
              </Label>
              <Col lg={12}>
                {ubahData ? (
                  <Select
                    id="jenisAkun"
                    placeholder="Pilih Jenis Akun"
                    defaultValue={
                      dataUser.tipe === 'Individu'
                        ? { value: 1, label: 'pribadi' }
                        : { value: dataUser.tipe, label: dataUser.tipe }
                    }
                    value={
                      optionsJenisAkun.value === null ? '' : optionsJenisAkun.value
                    }
                    styles={penggunaSelect}
                    noOptionsMessage={() => 'Jenis Akun Tidak Ditemukan :('}
                    options={optionsJenisAkun}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    isSearchable={false}
                    onChange={(e) => {
                      setDataUser({ ...dataUser, tipe: e.label })
                    }}
                  />
                ) :
                  <p className="detail-pengguna-text">{dataUser.tipe}</p>}
              </Col>
            </FormGroup>

            <FormGroup>
              {dataUser.tipe !== 'organisasi' && (
                <>
                  <Label for="pekerjaan" lg={12} className="detail-pengguna-label mb-1">
                    Pekerjaan
                  </Label>
                  <Col lg={12}>
                    {ubahData ? (
                      <Select
                        id="perkerjaan"
                        placeholder="Pilih Pekerjaan"
                        defaultValue={
                          dataUser.pekerjaan
                            ? { value: dataUser.pekerjaan, label: dataUser.pekerjaan }
                            : 'Pilih Pekerjaan'
                        }
                        value={
                          optionsPekerjaan.value === null
                            ? ''
                            : optionsPekerjaan.value
                        }
                        styles={penggunaSelect}
                        noOptionsMessage={() => 'Pekerjaan Tidak Ditemukan :('}
                        options={optionsPekerjaan}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        isSearchable={false}
                        onChange={(e) =>
                          setDataUser({ ...dataUser, pekerjaan: e.label })
                        }
                      />
                    ) :
                      <p className="detail-pengguna-text">{dataUser.pekerjaan ? dataUser.pekerjaan : "-"}</p>}
                  </Col>
                </>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="nominalDonasi" lg={12} className="detail-pengguna-label mb-1">
                Kecamatan
              </Label>
              <Col lg={12}>
                {ubahData ? (
                  <Select
                    id="kecamatanAlamat"
                    placeholder="Pilih Kecamatan"
                    defaultValue={
                      dataUser.kecamatan
                        ? { value: dataUser.kecamatan, label: dataUser.kecamatan }
                        : 'Pilih Kota/kabupaten'
                    }
                    value={
                      optionsKecamatan.value === null ? '' : optionsKecamatan.value
                    }
                    styles={penggunaSelect}
                    noOptionsMessage={() => 'Kecamatan Tidak Ditemukan :('}
                    options={optionsKecamatan}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    isSearchable={false}
                    onChange={(e) =>
                      setDataUser({ ...dataUser, kecamatan: e.label })
                    }
                  />
                ) :
                  <p className="detail-pengguna-text">{dataUser.kecamatan ? dataUser.kecamatan : "-"}</p>}
              </Col>
            </FormGroup>
          </div>
        </div>
        <div className="button-box mt-2 col-12">
          {ubahData ?
            (validator() ? (<button className='button-simpan'
              type='submit'>simpan</button>) : (<button className='button-simpan-disabled'
                disabled>simpan</button>)) :
            (<button className='button-ubah-data' onClick={handleOnEdit}>
              Ubah Data
            </button>)}
        </div>
      </form >
    </div >
  )
}

export default DataPengguna