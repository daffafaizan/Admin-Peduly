/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { Row, Card, CardBody, Table, Button, Modal, ModalBody } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import { getCurrentColor } from 'helpers/Utils'
import IdrFormat from 'helpers/IdrFormat'
import BreadcrumbContainer from 'containers/navs/Breadcrumb'
import { useParams } from 'react-router-dom'
import './index.scss'
import DataTablePagination from 'components/DatatablePagination'
import moment from 'moment'
import { API_ENDPOINT } from 'config/api'
import Select from 'react-select'
import axios from 'axios'
import http from 'helpers/http'
import TextAlert from 'components/TextAlert'

const optionsStatusTarikDana = [
  {
    value: "pending",
    label: "pending"
  },
  {
    value: "approved",
    label: "Berhasil"
  },
  {
    value: "rejected",
    label: "Dibatalkan"
  }
]

const optionsStatusGalangDana = [
  {
    value: "drafted",
    label: "Pending"
  },
  {
    value: "published",
    label: "Aktif"
  },
  {
    value: "suspend",
    label: "Suspend"
  }
]

const konversiToNumber = (angka) => {
  const idrFormat = IdrFormat(parseInt(angka))
  if (!isNaN(idrFormat)) {
    return idrFormat
  } else {
    return 0
  }
}

const formatDate = (tanggal) => {
  return moment(tanggal).format('DD/MM/YYYY HH:mm')
}

const DetailGalangDana = ({ match }) => {
  const [detail, setDetail] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const { id } = useParams()
  const [mode, setMode] = useState("detail")
  const [modal, setModal] = useState(false)
  const [nestedModal, setNestedModal] = useState(false)
  const [closeAll, setCloseAll] = useState(false)
  const [modalStatusGalangDana, setModalStatusGalangDana] = useState(false)
  const [statusGalangDana, setStatusGalangDana] = useState("")
  const [dataTarikDana, setDataTarikDana] = useState([])
  const [detailTarikDana, setDetailTarikDana] = useState({
    tanggal: "",
    nominal: 0,
    status: "",
    keterangan: ""
  })
  const [fetchStatus, setFetchStatus] = useState(false)
  const [idTarikDana, setIdTarikDana] = useState(null)

  const toggle = (idPenarikan) => {
    setModal(!modal)
    setIdTarikDana(idPenarikan)
  }

  const toggleNested = () => {
    setNestedModal(!nestedModal)
    setCloseAll(false)
  }

  const toggleAll = () => {
    handleSubmit()
    setNestedModal(!nestedModal)
    setCloseAll(true)
  }

  const tutupModalGalangDana = () => {
    setModalStatusGalangDana(false)
  }

  const submitStatusGalangDana = () => {
    handleStatusGalangDana()
    setModalStatusGalangDana(false)
  }


  const toggleStatusGalangDana = () => {
    setModalStatusGalangDana(!modalStatusGalangDana)
  }

  useEffect(() => {
    getDetailGalangDana()
    getAllDataTarikDana()
    getDetailTransaksi()
    getCurrentColor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const color = getCurrentColor()

  const getDetailGalangDana = () => {
    http
      .get(`${API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN}/${id}/details`)
      .then((res) => {
        setDetail(res.data.data)
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  //get detail transaksi galang dana by id
  const getDetailTransaksi = () => {
    http
      .get(`${API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN}/${id}/transactions`)
      .then((res) => {
        setTransaksi(res.data.data)
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  //post Status galang dana
  const handleStatusGalangDana = () => {
    //post one detail data tarik dana 
    const postStatusGalangDana = () => {
      http
        .put(`${API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN}/${id}/status`, {
          status: statusGalangDana
        })
        .then(() => {
          setFetchStatus(true)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }
    postStatusGalangDana()
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const currentPageSize = 10

  function filteredData() {
    let d

    d = transaksi.sort((a, b) => {
      return new Date(b.tanggal_donasi) - new Date(a.tanggal_donasi)
    })

    return d
  }

  useEffect(() => {
    setTotalPage((filteredData().length / currentPageSize).toFixed())
  }, [filteredData(), currentPageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

  //get All data tarik dana 
  const getAllDataTarikDana = () => {
    http
      .get(`${API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN}/${id}/funds`)
      .then((res) => {
        const responseData = res.data
        setDataTarikDana(responseData)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  // get one detail data tarik dana 
  useEffect(() => {
    if (idTarikDana) {
      getDetailTarikDana()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTarikDana])

  useEffect(() => {
    if (fetchStatus) {
      getDetailGalangDana()
      getAllDataTarikDana()
      getDetailTarikDana()
      setFetchStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus])

  const getDetailTarikDana = () => {
    http
      .get(`${API_ENDPOINT.GET_PENARIKAN_DANA}/${idTarikDana}/fund`)
      .then((res) => {
        const responseData = res.data.data
        setDetailTarikDana({
          tanggal: responseData.updated_at,
          nominal: responseData.nominal,
          keterangan: responseData.details,
          status: responseData.status
        })
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }


  const handleSubmit = () => {
    //post one detail data tarik dana 
    const postDetailTarikDana = () => {
      axios
        .post(`${API_ENDPOINT.GET_PENARIKAN_DANA}/${idTarikDana}/approve`, {
          nominal: detailTarikDana.nominal,
          keterangan: detailTarikDana.keterangan
        })
        .then(() => {
          setFetchStatus(true)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }
    postDetailTarikDana()
  }

  const customStylesStatusGalangDana = {
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
      width: '152px',
      paddingLeft: 5,
      paddingRight: 0,
      borderRadius: '30px',
      border: statusGalangDana === 'Pending' && '2px solid rgba(252, 174, 3, 0.2)',
      backgroundColor: 'transparent',
      color: '#FCAE03',
      font: 'root.font.regular',
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
      width: '152px',
      paddingLeft: 5,
      paddingRight: 0,
      borderRadius: '30px',
      border: detailTarikDana.status === 'pending' && '2px solid rgba(252, 174, 3, 0.2)',
      backgroundColor: detailTarikDana.status === 'pending' && 'rgba(252, 174, 3, 0.2)',
      color: '#FCAE03',
      font: 'root.font.regular',
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

  const defaultValueStatusTarikDana = () => {
    if (detailTarikDana.status === "approved") {
      return { value: detailTarikDana.status, label: "Berhasil" }
    } else if (detailTarikDana.status === "pending") {
      return { value: detailTarikDana.status, label: "Pending" }
    } else {
      return "pilih status"
    }
  }

  const defaultValueStatusGalangDana = () => {
    if (detail.status === "Active") {
      return { value: detail.status, label: "Aktif" }
    } else if (detail.status === "Pending") {
      return { value: detail.status, label: "Pending" }
    } else {
      return "pilih status"
    }
  }

  return (
    <>
      <Row>
        <Colxx xxs="12" className="p-0 m-0">
          <BreadcrumbContainer match={match} />
        </Colxx>
      </Row>
      <div>
        <div className="d-flex" style={{ marginBottom: '38px' }}>
          <div className="d-flex w-full judul-container flex-column flex-md-row flex-wrap">
            <a
              href={`https://demo.peduly.com/${detail.judul_slug}`}
              className="judul mb-2 mb-md-0"
              target="_blank"
              rel="noreferrer"
            >
              {detail.judul_campaign}
            </a>
            <form>
              <Select
                className="selectStatusGalangDana"
                classNamePrefix="select"
                styles={customStylesStatusGalangDana}
                placeholder="Pilih Status"
                defaultValue={defaultValueStatusGalangDana()}
                name="color"
                value={
                  defaultValueStatusGalangDana()
                }
                isSearchable={false}
                options={optionsStatusGalangDana}
                onChange={(e) => {
                  setStatusGalangDana(e.value)
                  toggleStatusGalangDana()
                }
                }
              />
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalStatusGalangDana} toggle={toggleStatusGalangDana}
        onClosed={tutupModalGalangDana}
        className="card modal-tarik-dana-nested"
      >
        <ModalBody>Apakah kamu yakin ingin merubah status?</ModalBody>
        <div className="modal-nested-button">
          <Button className="btn-secondary mr-4" onClick={tutupModalGalangDana}>
            Tidak
          </Button>
          <Button type="submit" color="primary" onClick={submitStatusGalangDana}>
            Iya
          </Button>
        </div>
      </Modal>

      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4 p-0 flex-lg-row flex-md-column mr-0" style={{ borderRadius: '15px', margin: 0 }}>
            <Row className="sidebar-galang-dana col-lg-2 col-md-12">
              <div className="sidebar-menu-galang-dana">
                <span className={`${mode === 'detail' ? 'button-menu-galang-dana-active' : 'button-menu-galang-dana'}`}
                  onClick={() => { setMode('detail') }}>Detail</span>
                <span className={`${mode === 'tarik-dana' ? 'button-menu-galang-dana-active' : 'button-menu-galang-dana'}`} onClick={() => { setMode('tarik-dana') }}>Tarik Dana</span>
              </div>
            </Row>
            {mode === 'detail' && (<div className="col-10 w-100">
              <Row className="mt-4 ml-1">
                <Colxx xs="12" sm="6" lg="3">
                  <div className="container-card">
                    <svg
                      className="mx-auto w-full icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="none"
                      viewBox="0 0 60 60"
                    >
                      <path
                        stroke="#E7513B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="3"
                        d="M5 21.25h31.25M15 41.25h5M26.25 41.25h10"
                      ></path>
                      <path
                        stroke="#E7513B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M55 35.075v5.2c0 8.775-2.225 10.975-11.1 10.975H16.1C7.225 51.25 5 49.05 5 40.275v-20.55C5 10.95 7.225 8.75 16.1 8.75h20.15M50 8.75v15l5-5M50 23.75l-5-5"
                      ></path>
                    </svg>
                    <p className="mx-auto text-center judul">Dana Terkumpul</p>
                    <p className="text-center content">
                      Rp {konversiToNumber(detail.donasi_terkumpul)}
                    </p>
                  </div>
                </Colxx>
                <Colxx xs="12" sm="6" lg="3">
                  <div className="container-card">
                    <svg
                      className="mx-auto w-full icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      fill="none"
                      viewBox="0 0 60 60"
                    >
                      <path
                        stroke="#E7513B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M30 30c6.904 0 12.5-5.596 12.5-12.5S36.904 5 30 5s-12.5 5.596-12.5 12.5S23.096 30 30 30zM51.475 55c0-9.675-9.625-17.5-21.475-17.5-11.85 0-21.475 7.825-21.475 17.5"
                      ></path>
                    </svg>
                    <p className="mx-auto text-center judul">Jumlah Donatur</p>
                    <p className="text-center content">
                      {detail.jumlah_donatur}
                    </p>
                  </div>
                </Colxx>
                <Colxx xs="12" sm="6" lg="3">
                  <Row>
                    <Colxx xxs="12">
                      <div className="container-card-half card-top">
                        <p className="judul">Biaya Payment Gateway</p>
                        <p className="content">
                          Rp {konversiToNumber(detail.biaya_payment_gateway)}
                        </p>
                      </div>
                    </Colxx>
                    <Colxx xxs="12">
                      <div className="container-card-half card-bottom">
                        <p className="judul">Biaya Operasional</p>
                        <p className="content">
                          Rp {konversiToNumber(detail.biaya_operasional)}
                        </p>
                      </div>
                    </Colxx>
                  </Row>
                </Colxx>
                <Colxx xs="12" sm="6" lg="3">
                  <Row>
                    <Colxx xxs="12">
                      <div className="container-card-half card-top">
                        <p className="judul">Biaya Referal & Iklan</p>
                        <p className="content">
                          Rp {konversiToNumber(detail.biaya_referal_iklan)}
                        </p>
                      </div>
                    </Colxx>
                    <Colxx xxs="12">
                      <div className="container-card-half card-bottom">
                        <p className="judul">Total Payable</p>
                        <p className="content text-success">
                          Rp {konversiToNumber(detail.payable)}
                        </p>
                      </div>
                    </Colxx>
                  </Row>
                </Colxx>
              </Row>
              <div className="heading-border">
                <h2 className="ml-4 mt-4 mb-3 font-weight-bold pb-2">Transaksi</h2>
              </div>
              <CardBody className="pt-0">
                <Table
                  hover
                  responsive
                  className={`${!color.indexOf('dark') ? 'table-dark-mode' : ''}`}
                >
                  <thead>
                    <tr>
                      <th style={{ borderTop: '0px' }}>#</th>
                      <th style={{ borderTop: '0px' }}>Nama</th>
                      <th style={{ borderTop: '0px' }}>Tanggal</th>
                      <th style={{ borderTop: '0px' }}>Nominal</th>
                      <th style={{ borderTop: '0px' }}>- BPG</th>
                      <th style={{ borderTop: '0px' }}>- Referal</th>
                      <th style={{ borderTop: '0px' }}>- BA</th>
                      <th style={{ borderTop: '0px' }}>Payable</th>
                      <th style={{ borderTop: '0px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().length !== 0 ? (
                      filteredData()
                        .slice(
                          (currentPage - 1) * currentPageSize,
                          currentPage * currentPageSize
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td>
                              {(currentPage - 1) * currentPageSize + index + 1}
                            </td>
                            <td>{item.nama ? item.nama : 'Warga Baik'}</td>
                            <td>{formatDate(item.tanggal_donasi)}</td>
                            <td>Rp {konversiToNumber(item.nominal)}</td>
                            <td>
                              Rp {konversiToNumber(item.biaya_payment_gateway)}
                            </td>
                            <td>
                              Rp {konversiToNumber(item.biaya_referal_iklan)}
                            </td>
                            <td>Rp {konversiToNumber(item.biaya_operasional)}</td>
                            <td>Rp {konversiToNumber(item.payable)}</td>
                            <td>
                              {item.status_donasi === 'Approved' && (
                                <TextAlert text={'Berhasil'} />
                              )}
                              {item.status_donasi === 'Pending' && (
                                <TextAlert text={'Pending'} type="warning" />
                              )}
                              {(!item.status_donasi ||
                                item.status_donasi === 'Denied' ||
                                item.status_donasi === 'Rejected' ||
                                item.status_donasi === 'Refund') && (
                                  <TextAlert text={'Dibatalkan'} type="danger" />
                                )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </div>
            )}
            {mode === 'tarik-dana' && (<div className="col-10 w-100">
              <Row className="mt-4 ml-1 mb-5">
                <Colxx xs="12" sm="6" lg="3">
                  <Row>
                    <Colxx xxs="12">
                      <div className="container-card-half card-top">
                        <p className="judul">Total Payable</p>
                        <p className="content">
                          Rp {konversiToNumber(dataTarikDana.payable)}
                        </p>
                      </div>
                    </Colxx>
                  </Row>
                </Colxx>
                <Colxx xs="12" sm="6" lg="3">
                  <Row>
                    <Colxx xxs="12">
                      <div className="container-card-half card-top">
                        <p className="judul">Total yang bisa ditarik</p>
                        <p className="content">
                          Rp {konversiToNumber(dataTarikDana.sisa_payable)}
                        </p>
                      </div>
                    </Colxx>
                  </Row>
                </Colxx>
              </Row>
              <div className="heading-border">
                <h2 className="ml-4 mt-4 mb-3 font-weight-bold pb-3">Riwayat Penarikan Dana</h2>
              </div>
              <CardBody className="pt-0">
                <Table
                  hover
                  responsive
                  className={`${!color.indexOf('dark') ? 'table-dark-mode' : ''}`}
                >
                  <thead>
                    <tr>
                      <th style={{ borderTop: '0px' }}>Tanggal</th>
                      <th style={{ borderTop: '0px' }}>Penarikan Dana</th>
                      <th style={{ borderTop: '0px', width: 464 }}>Keterangan</th>
                      <th style={{ borderTop: '0px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataTarikDana.data.map((item) => (
                        <tr onClick={() => { toggle(item.id) }} style={{ cursor: 'pointer' }} key={item.id}>
                          <td>{formatDate(item.updated_at)}</td>
                          <td>Rp {IdrFormat(item.nominal)}</td>
                          <td>{item.details}</td>
                          <td>
                            {item.status === 'approved' && (
                              <p
                                className="text-success rounded text-center status bg-status-success"
                                style={{
                                  maxWidth: '94px',
                                }}
                              >
                                Berhasil
                              </p>
                            )}
                            {item.status === 'pending' && (
                              <p
                                className="text-warning rounded text-center status bg-status-pending"
                                style={{
                                  maxWidth: '94px',
                                }}
                              >
                                Pending
                              </p>
                            )}
                            {item.status === 'rejected' && (
                              <p
                                className="text-danger rounded text-center status bg-status-danger"
                                style={{
                                  maxWidth: '94px',
                                }}
                              >
                                Dibatalkan
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </div>
            )}
          </Card>
        </Colxx>
      </Row>
      {totalPage !== '0' && mode === 'detail' && (
        <div className="float-md-right">
          <DataTablePagination
            page={currentPage - 1}
            pages={totalPage}
            canNext={currentPage < Number(totalPage)}
            canPrevious={currentPage > 1}
            onPageChange={(page) => setCurrentPage(page + 1)}
            paginationMaxSize={totalPage > 10 ? 10 : Number(totalPage)}
          />
        </div>
      )}

      <div className="box-tarik-dana">
        <Modal isOpen={modal} toggle={toggle} size='xl' className="card modal-tarik-dana" >
          <form>
            <ModalBody className="modal-body-tarik-dana">
              <div className="form-tarik-dana">
                <Colxx lg={8} className="d-flex flex-column">
                  <h3 className="mb-4">Permintaan Tarik Dana</h3>

                  <div className="form-box-input">
                    <label
                      htmlFor="tanggal"
                      className="form-text-judul"
                    >
                      Tanggal
                    </label>
                    <p
                      id="tanggal"
                      className="form-text"
                    > {formatDate(detailTarikDana.tanggal)} </p>
                  </div>
                  <div className="form-box-input mb-3 mt-4">
                    <label
                      htmlFor="nominal"
                      className="form-text-judul"
                    >
                      Nominal
                    </label>
                    <input
                      id="nominal"
                      className="form-input mb-3"
                      type="number"
                      placeholder="masukan nominal"
                      maxLength="50"
                      value={detailTarikDana.nominal}
                      onChange={(e) =>
                        setDetailTarikDana({ ...detailTarikDana, nominal: e.target.value })
                      }
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="keterangan"
                      className="form-text-judul"
                    >
                      Keterangan
                    </label>
                    <textarea
                      id="keterangan"
                      className="form-textarea"
                      type="text"
                      placeholder="keterangan"
                      value={detailTarikDana.keterangan}
                      onChange={(e) => {
                        setDetailTarikDana({ ...detailTarikDana, keterangan: e.target.value })
                      }
                      }
                    />
                  </div>
                </Colxx>
                <Colxx lg={1}>
                  <div className="form-line"></div>
                </Colxx>
                <Colxx lg={3}>
                  <label
                    htmlFor="status"
                    className="form-text-judul"
                  >
                    Status
                  </label>

                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    placeholder="Pilih Status"
                    defaultValue={
                      defaultValueStatusTarikDana()
                    }
                    name="color"
                    value={
                      defaultValueStatusTarikDana()
                    }
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    isSearchable={false}
                    options={optionsStatusTarikDana}
                    onChange={(e) => {
                      setDetailTarikDana({ ...detailTarikDana, status: e.value })
                      toggleNested()
                    }}
                  />
                </Colxx>
              </div>
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
                className="card modal-tarik-dana-nested"
              >
                <ModalBody>Apakah kamu yakin ingin merubah status?</ModalBody>
                <div className="modal-nested-button">
                  <Button className="btn-secondary mr-4" onClick={toggleNested}>
                    Tidak
                  </Button>
                  <Button type="submit" color="primary" onClick={toggleAll}>
                    Iya
                  </Button>
                </div>
              </Modal>
            </ModalBody>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default DetailGalangDana