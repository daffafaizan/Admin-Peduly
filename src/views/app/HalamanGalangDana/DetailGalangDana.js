/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { Row, Card, CardBody, Table, Button, Modal, ModalBody, Input } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import { getCurrentColor } from 'helpers/Utils'
import IdrFormat from 'helpers/IdrFormat'
import Breadcrumb from 'containers/navs/Breadcrumb'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import './index.scss'
import DataTablePagination from 'components/DatatablePagination'
import moment from 'moment'
import { API_URL } from 'config/api'

const DetailGalangDana = ({ match }) => {
  const [detail, setDetail] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const { id } = useParams()
  const [mode, setMode] = useState("detail")
  const [modal, setModal] = useState(false)
  const [nestedModal, setNestedModal] = useState(false)
  const [closeAll, setCloseAll] = useState(false)
  const [dataTarikDana, setDataTarikDana] = useState([])
  const [dataListTarikDana, setDataListTarikDana] = useState({})
  const [data, setData] = useState({
    tanggal: "",
    nominal: 0,
    keterangan: "",
    status: ""
  })

  const toggle = () => setModal(!modal)
  const toggleNested = () => {
    setNestedModal(!nestedModal)
    setCloseAll(false)
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal)
    setCloseAll(true)
  }


  useEffect(() => {
    // get token
    const token = Cookies.get('token')
    const getDetailGalangDanaById = () => {
      // get detail galang dana data by id
      axios
        .get(`${API_URL}/api/admin/galangdana/${id}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const responseData = res.data.data
          setDetail(responseData)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }

    //get detail transaksi galang dana by id
    const getDetailTransaksiGalangDanaById = () => {
      axios
        .get(`${API_URL}/api/admin/galangdana/${id}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const responseData = res.data.data
          const orderResponseData = responseData.sort(function (a, b) {
            return (
              moment(b.tanggal_donasi, 'YYYY/MM/DD HH:mm:ss') -
              moment(a.tanggal_donasi, 'YYYY/MM/DD HH:mm:ss')
            )
          })
          setTransaksi(orderResponseData)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
    }

    //get All data tarik dana 
    const getAllDataTarikDana = () => {
      axios
        .get(`${API_URL}/api/admin/galangdana/${id}/funds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const responseData = res.data
          const orderResponseData = responseData.data.sort(function (a, b) {
            return (
              moment(b.updated_at, 'YYYY/MM/DD HH:mm:ss') -
              moment(a.updated_at, 'YYYY/MM/DD HH:mm:ss')
            )
          })
          setDataListTarikDana(orderResponseData)
          setDataTarikDana(responseData)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
        console.log(dataListTarikDana, dataTarikDana)
    }

    getDetailGalangDanaById()
    getDetailTransaksiGalangDanaById()
    getAllDataTarikDana()
  }, [dataListTarikDana, dataTarikDana, id])

  useEffect(() => {
    getCurrentColor()
  }, [])

  const color = getCurrentColor()

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const currentPageSize = 10

  useEffect(() => {
    setTotalPage(Math.ceil(transaksi.length / currentPageSize))
  }, [transaksi, currentPageSize])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

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

  return (
    <>
      <Row>
        <Colxx xxs="12" className="p-0 m-0">
          <Breadcrumb match={match} />
        </Colxx>
      </Row>
      <div key={detail.id}>
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
            <Input
              id="selectStatusGalangDana"
              name="select"
              type="select"
              onChange={toggleNested}
              className="input-select-galang-dana"
            >
              <option className="my-2">
                Status Pending
              </option>
              <option className="my-2">
                Status Aktif
              </option>
              <option className="my-2">
                Status Suspend
              </option>
            </Input>
          </div>
        </div>
      </div>

      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4 p-0 flex-row mr-0" style={{ borderRadius: '15px', margin: 0 }}>
            <Row className="sidebar-galang-dana col-2">
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
                  className={`${!color.indexOf('dark') && 'table-dark-mode'}`}
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
                    {transaksi
                      .slice(
                        (currentPage - 1) * currentPageSize,
                        currentPage * currentPageSize
                      )
                      .map((item, idx) => (
                        <tr key={idx}>
                          <td>{(currentPage - 1) * currentPageSize + idx + 1}</td>
                          <td>{item.nama ? item.nama : 'Warga Baik'}</td>
                          <td>{formatDate(item.tanggal_donasi)}</td>
                          <td>Rp {konversiToNumber(item.nominal)}</td>
                          <td>
                            Rp {konversiToNumber(item.biaya_payment_gateway)}
                          </td>
                          <td>Rp {konversiToNumber(item.biaya_referal_iklan)}</td>
                          <td>Rp {konversiToNumber(item.biaya_operasional)}</td>
                          <td>Rp {konversiToNumber(item.payable)}</td>
                          <td>
                            {item.status_donasi === 'Approved' && (
                              <p
                                className="text-success rounded text-center status bg-status-success"
                                style={{
                                  maxWidth: '77px',
                                }}
                              >
                                Berhasil
                              </p>
                            )}
                            {item.status_donasi === 'Pending' && (
                              <p
                                className="text-warning rounded text-center status bg-status-pending"
                                style={{
                                  maxWidth: '78px',
                                }}
                              >
                                Pending
                              </p>
                            )}
                            {item.status_donasi === 'Rejected' && (
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
                  className={`${!color.indexOf('dark') && 'table-dark-mode'}`}
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
                    <tr onClick={toggle} style={{ cursor: 'pointer' }}>
                      <td>10/02/2023 14:50</td>
                      <td>Rp 2.000.000</td>
                      <td>Dana akan kami gunakan untuk keperluan bahan-bahan untuk pembangaunan masjid yaitu semen 2kg, batu bata 100 pcs.</td>
                      <td>
                        {/* {item.status_donasi === 'Approved' && (
                              <p
                                className="text-success rounded text-center status bg-status-success"
                                style={{
                                  maxWidth: '77px',
                                }}
                              >
                                Berhasil
                              </p>
                            )}
                            {item.status_donasi === 'Pending' && (
                              <p
                                className="text-warning rounded text-center status bg-status-pending"
                                style={{
                                  maxWidth: '78px',
                                }}
                              >
                                Pending
                              </p>
                            )}
                            {item.status_donasi === 'Rejected' && (
                              <p
                                className="text-danger rounded text-center status bg-status-danger"
                                style={{
                                  maxWidth: '94px',
                                }}
                              >
                                Dibatalkan
                              </p>
                            )} */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </div>
            )}
          </Card>
        </Colxx>
      </Row>
      {mode === 'detail' && (
        <DataTablePagination
          page={currentPage - 1}
          pages={totalPage}
          canNext={currentPage < totalPage}
          canPrevious={currentPage > 1}
          onPageChange={(page) => setCurrentPage(page + 1)}
          paginationMaxSize={10}
        />
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
                    > {data.tanggal} </p>
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
                      type="text"
                      placeholder="masukan nominal"
                      maxLength="50"
                      value={data.nominal}
                      onChange={(e) =>
                        setData({ ...data, nominal: e.target.value })
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
                      maxLength="50"
                      value={data.keterangan}
                      onChange={(e) =>
                        setData({ ...data, keterangan: e.target.value })
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
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={toggleNested}
                    className="input-select"
                  >
                    <option className="my-2">
                      Pending
                    </option>
                    <option className="my-2">
                      Berhasil
                    </option>
                    <option className="my-2">
                      Dibatalkan
                    </option>
                  </Input>
                </Colxx>
              </div>
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
                className="card modal-tarik-dana"
              >
                <ModalBody>Stuff and things</ModalBody>
                <div className="d-flex">
                  <Button color="primary" onClick={toggleNested}>
                    Tidak
                  </Button>
                  <Button color="secondary" onClick={toggleAll}>
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
