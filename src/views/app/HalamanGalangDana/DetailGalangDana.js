import { useState, useEffect } from 'react'
import { Row, Card, CardBody, Table } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import { getCurrentColor } from 'helpers/Utils'
import IdrFormat from 'helpers/IdrFormat'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './index.scss'
import DataTablePagination from 'components/DatatablePagination'
import moment from 'moment'
import { API_ENDPOINT } from 'config/api'
import BreadcrumbContainer from 'containers/navs/Breadcrumb'
import http from 'helpers/http'
import TextAlert from 'components/TextAlert'

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
  const { id } = useParams()

  const [detail, setDetail] = useState([])
  const [transaksi, setTransaksi] = useState([])
  const currentPageSize = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getDetailGalangDana()
    getDetailTransaksi()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTotalPage((filteredData().length / currentPageSize).toFixed())
  }, [filteredData(), currentPageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

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

  function filteredData() {
    let d

    d = transaksi.sort((a, b) => {
      return new Date(b.tanggal_donasi) - new Date(a.tanggal_donasi)
    })

    return d
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
              className="text-danger judul mb-2 mb-md-0"
              target="_blank"
              rel="noreferrer"
            >
              {detail.judul_campaign}
            </a>
            <Link
              to="/error"
              className="rounded border-status-danger text-danger edit-btn w-sm-50 w-md-0 text-center"
            >
              Edit Galang Dana
            </Link>
          </div>
        </div>
        <Row>
          <Colxx xs="12" sm="6" lg="3">
            <div className="card container-card">
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
              <p className="text-danger text-center content">
                Rp {konversiToNumber(detail.donasi_terkumpul)}
              </p>
            </div>
          </Colxx>
          <Colxx xs="12" sm="6" lg="3">
            <div className="card container-card">
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
              <p className="text-danger text-center content">
                {detail.jumlah_donatur}
              </p>
            </div>
          </Colxx>
          <Colxx xs="12" sm="6" lg="3">
            <Row className="row-gap-3">
              <Colxx xxs="12">
                <div className="card container-card-half card-top">
                  <p className="judul">Biaya Payment Gateway</p>
                  <p className="text-danger content">
                    Rp {konversiToNumber(detail.biaya_payment_gateway)}
                  </p>
                </div>
              </Colxx>
              <Colxx xxs="12">
                <div className="card container-card-half card-bottom">
                  <p className="judul">Biaya Operasional</p>
                  <p className="text-danger content">
                    Rp {konversiToNumber(detail.biaya_operasional)}
                  </p>
                </div>
              </Colxx>
            </Row>
          </Colxx>
          <Colxx xs="12" sm="6" lg="3">
            <Row className="row-gap-3">
              <Colxx xxs="12">
                <div className="card container-card-half card-top">
                  <p className="judul">Biaya Referal & Iklan</p>
                  <p className="text-danger content">
                    Rp {konversiToNumber(detail.biaya_referal_iklan)}
                  </p>
                </div>
              </Colxx>
              <Colxx xxs="12">
                <div className="card container-card-half card-bottom">
                  <p className="judul">Total Payable</p>
                  <p className="text-danger content">
                    Rp {konversiToNumber(detail.payable)}
                  </p>
                </div>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </div>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4 card-rounded">
            <div>
              <h2 className="ml-4 mt-4 mb-3 font-weight-bold">Transaksi</h2>
            </div>
            <CardBody className="card-body">
              <Table
                hover
                responsive
                className={`${!color.indexOf('dark') ? 'table-dark-mode' : ''}`}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Nominal</th>
                    <th>- BPG</th>
                    <th>- Referal</th>
                    <th>- BA</th>
                    <th>Payable</th>
                    <th>Status</th>
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
            {totalPage !== '0' && (
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
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default DetailGalangDana
