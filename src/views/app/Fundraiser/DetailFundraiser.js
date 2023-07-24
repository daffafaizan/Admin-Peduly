import { useEffect, useState } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import MiniCard2 from '../../../components/MiniCard2'
import TextAlert from 'components/TextAlert'
import './index.scss'
import IdrFormat from 'helpers/IdrFormat'
// import moment from 'moment'
import DataTablePagination from 'components/DatatablePagination'
// import TextAlert from 'components/TextAlert'
import { useParams, NavLink } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import { getCurrentColor } from 'helpers/Utils'
// import http from 'helpers/http'
// import { API_ENDPOINT } from 'config/api'
import { DUMMY_DATA_TRANSAKSI } from './data/DummyDataTransaksi'
import { DUMMY_DATA_KOMISI } from './data/DummyDataKomisi'

const pageSizes = [20, 40, 80]

const DetailFundraiser = () => {
  const [dataTransaksi, setDataTransaksi] = useState([])
  const [currentPageTransaksiSize, setCurrentPageTransaksiSize] = useState(
    pageSizes[0]
  )
  const [currentPageTransaksi, setCurrentPageTransaksi] = useState(1)
  const [totalPageTransaksi, setTotalPageTransaksi] = useState(0)

  const [dataKomisi, setDataKomisi] = useState([])
  const [currentPageKomisiSize, setCurrentPageKomisiSize] = useState(
    pageSizes[0]
  )
  const [currentPageKomisi, setCurrentPageKomisi] = useState(1)
  const [totalPageKomisi, setTotalPageKomisi] = useState(0)

  const [isHovered, setIsHovered] = useState(false)
  const [mode, setMode] = useState('transaksi')
  const { id } = useParams()

  // const history = useHistory()
  const color = getCurrentColor()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    getCurrentColor()
    getDataTransaksi()
    getDataKomisi()
  }, [])

  // Page Transaksi
  useEffect(() => {
    setTotalPageTransaksi(
      Math.ceil(dataTransaksi.length / currentPageTransaksiSize)
    )
  }, [currentPageTransaksiSize, dataTransaksi])

  useEffect(() => {
    if (currentPageTransaksi > totalPageTransaksi) setCurrentPageTransaksi(1)
  }, [totalPageTransaksi, currentPageTransaksi])

  //Page Komisi
  useEffect(() => {
    setTotalPageKomisi(Math.ceil(dataKomisi.length / currentPageKomisiSize))
  }, [currentPageKomisiSize, dataKomisi])

  useEffect(() => {
    if (currentPageKomisi > totalPageKomisi) setCurrentPageKomisi(1)
  }, [totalPageKomisi, currentPageKomisi])

  const getDataTransaksi = () => {
    setDataTransaksi(DUMMY_DATA_TRANSAKSI)
  }

  const getDataKomisi = () => {
    setDataKomisi(DUMMY_DATA_KOMISI)
  }

  const konversiToNumber = (angka) => {
    const idrFormat = IdrFormat(parseInt(angka))
    if (!isNaN(idrFormat)) {
      return idrFormat
    } else {
      return 0
    }
  }

  function filteredDataTransaksi() {
    let s

    s = dataTransaksi.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return s
  }

  function filteredDataKomisi() {
    let s

    s = dataKomisi.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return s
  }

  return (
    <div className="detail-fundraiser-page">
      <Row>
        <Colxx xxs="12">
          <Row>
            <div
              className="svg-container ml-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink to={'/app/fundraiser'}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57 5.93018L3.5 12.0002L9.57 18.0702"
                    stroke={isHovered ? '#FF0000' : '#3A3A3A'}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12H3.66992"
                    stroke={isHovered ? '#FF0000' : '#3A3A3A'}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </div>
            <h1>Firda Yuningsih {id}</h1>
          </Row>
          <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Col xs="6">
              <div className="float-left d-flex flex-col justify-content-center align-items-center">
                <div className="button-container">
                  {color === 'dark.purplemonster' && (
                    <>
                      <Button
                        className={`${
                          mode === 'transaksi'
                            ? 'dark-button-transaksi-active'
                            : 'dark-button-transaksi'
                        }`}
                        onClick={() => {
                          setMode('transaksi')
                        }}
                      >
                        Transaksi
                      </Button>
                      <Button
                        className={`${
                          mode === 'komisi'
                            ? 'dark-button-komisi-active'
                            : 'dark-button-komisi'
                        }`}
                        onClick={() => {
                          setMode('komisi')
                        }}
                      >
                        Komisi
                      </Button>
                    </>
                  )}
                  {color === 'light.purplemonster' && (
                    <>
                      <Button
                        className={`${
                          mode === 'transaksi'
                            ? 'button-transaksi-active'
                            : 'button-transaksi'
                        }`}
                        onClick={() => {
                          setMode('transaksi')
                        }}
                      >
                        Transaksi
                      </Button>
                      <Button
                        className={`${
                          mode === 'komisi'
                            ? 'button-komisi-active'
                            : 'button-komisi'
                        }`}
                        onClick={() => {
                          setMode('komisi')
                        }}
                      >
                        Komisi
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Col>
            {mode === 'transaksi' && (
              <Col xs="6">
                <div className="float-right mt-1 d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <span className="text-muted text-small mr-1">{`${currentPageTransaksi} of ${totalPageTransaksi} `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {currentPageTransaksiSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {pageSizes.map((size, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => setCurrentPageTransaksiSize(size)}
                            >
                              {size}
                            </DropdownItem>
                          )
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </Col>
            )}
            {mode === 'komisi' && (
              <Col xs="6">
                <div className="float-right mt-1 d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <span className="text-muted text-small mr-1">{`${currentPageKomisi} of ${totalPageKomisi} `}</span>
                    <UncontrolledDropdown className="d-inline-block">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        {currentPageKomisiSize}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {pageSizes.map((size, index) => {
                          return (
                            <DropdownItem
                              key={index}
                              onClick={() => setCurrentPageKomisiSize(size)}
                            >
                              {size}
                            </DropdownItem>
                          )
                        })}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Colxx>
      </Row>
      {mode === 'transaksi' && (
        <>
          <Row>
            <Colxx xs="12" className="mb-4">
              <Card className="mb-4 card-rounded">
                <CardBody className="card-body">
                  <Table
                    hover
                    responsive
                    className={`${
                      !color.indexOf('dark') ? 'table-dark-mode' : ''
                    } center-text-table`}
                  >
                    <thead>
                      <tr className="nowrap">
                        <th style={{ borderTop: '0px' }}>Nominal</th>
                        <th style={{ borderTop: '0px' }}>Donatur</th>
                        <th style={{ borderTop: '0px' }}>No. Transaksi</th>
                        <th style={{ borderTop: '0px' }}>Metode Pembayaran</th>
                        <th style={{ borderTop: '0px' }}>Waktu</th>
                        <th style={{ borderTop: '0px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataTransaksi().length !== 0 ? (
                        filteredDataTransaksi()
                          .slice(
                            (currentPageTransaksi - 1) *
                              currentPageTransaksiSize,
                            currentPageTransaksi * currentPageTransaksiSize
                          )
                          .map((item) => (
                            <>
                              <tr
                                key={item.id}
                                style={{
                                  height: '60px',
                                  backgroundColor: '#E4E4E44D',
                                  fontWeight: 'bold',
                                }}
                              >
                                <td>Rp{konversiToNumber(item.total_donasi)}</td>
                                <td colSpan={3}></td>
                                <td>{item.tanggal}</td>
                                <td>{item.jumlah_donasi} Donasi Berhasil</td>
                              </tr>
                              {item.donasi.map((itemDonasi) => (
                                <tr
                                  key={itemDonasi.id}
                                  style={{ height: '60px' }}
                                >
                                  <td>
                                    Rp{konversiToNumber(itemDonasi.nominal)}
                                  </td>
                                  <td>{itemDonasi.donatur}</td>
                                  <td>{itemDonasi.invoice}</td>
                                  <td>{itemDonasi.metode_pembayaran}</td>
                                  <td>{itemDonasi.waktu}</td>
                                  <td>
                                    {itemDonasi.status === 'Berhasil' && (
                                      <TextAlert text={'Berhasil'} />
                                    )}
                                    {itemDonasi.status === 'Pending' && (
                                      <TextAlert
                                        text={'Pending'}
                                        type="warning"
                                      />
                                    )}
                                    {itemDonasi.status === 'Dibatalkan' && (
                                      <TextAlert
                                        text={'Dibatalkan'}
                                        type="danger"
                                      />
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </>
                          ))
                      ) : (
                        <tr>
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
              </Card>
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              {totalPageTransaksi !== '0' && (
                <div className="float-md-right">
                  <DataTablePagination
                    page={currentPageTransaksi - 1}
                    pages={totalPageTransaksi}
                    canNext={currentPageTransaksi < Number(totalPageKomisi)}
                    canPrevious={currentPageTransaksi > 1}
                    onPageChange={(page) => setCurrentPageKomisi(page + 1)}
                    paginationMaxSize={
                      totalPageTransaksi > 10 ? 10 : Number(totalPageTransaksi)
                    }
                  />
                </div>
              )}
            </Colxx>
          </Row>
        </>
      )}
      {mode === 'komisi' && (
        <>
          <Row className="section-3-container" style={{ marginBottom: '20px' }}>
            <Col>
              <MiniCard2
                title="Dana Terkumpul"
                // text={`Rp ${
                //   summaryData
                //     ? IdrFormat(parseInt(summaryData?.donasi_terkumpul))
                //     : '0'
                // }`}
                text={`Rp9.300.000`}
              />
            </Col>
            <Col>
              <MiniCard2 title="Total Donatur" text={'403'} />
            </Col>
            <Col>
              <MiniCard2 title="Total Pendapatan Komisi" text={`Rp1.902.000`} />
            </Col>
            <Col>
              <MiniCard2 title="Komisi Tersedia" text={`Rp902.000`} />
            </Col>
            <Col>
              <MiniCard2 title="Komisi Ditarik" text={`Rp1.000.000`} />
            </Col>
          </Row>
          <Row>
            <Colxx xs="12" className="mb-4">
              <Card className="mb-4 mt-1 card-rounded">
                <CardBody className="card-body">
                  <Table
                    hover
                    responsive
                    className={`${
                      !color.indexOf('dark') ? 'table-dark-mode' : ''
                    } center-text-table`}
                  >
                    <thead>
                      <tr className="nowrap">
                        <th style={{ borderTop: '0px' }}>
                          Riwayat Penarikan Komisi
                        </th>
                        <th style={{ borderTop: '0px' }}>No. Transaksi</th>
                        <th style={{ borderTop: '0px' }}>Rekening Tujuan</th>
                        <th style={{ borderTop: '0px' }}>A/N Rekening</th>
                        <th style={{ borderTop: '0px' }}>Nama Bank</th>
                        <th style={{ borderTop: '0px' }}>Tanggal</th>
                        <th style={{ borderTop: '0px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataKomisi().length !== 0 ? (
                        filteredDataKomisi()
                          .slice(
                            (currentPageKomisi - 1) * currentPageKomisiSize,
                            currentPageKomisi * currentPageKomisiSize
                          )
                          .map((item) => (
                            <tr key={item.id} style={{height: "60px"}}>
                              <td>
                                Rp
                                {konversiToNumber(item.riwayatPenarikanKomisi)}
                              </td>
                              <td>{item.noTransaksi}</td>
                              <td>{item.rekeningTujuan}</td>
                              <td>{item.namaRekening}</td>
                              <td>{item.namaBank}</td>
                              <td>{item.tanggal}</td>
                              <td>
                                {item.status === 'Terkirim' && (
                                  <TextAlert text={'Terkirim'} />
                                )}
                                {item.status === 'Pending' && (
                                  <TextAlert text={'Pending'} type="warning" />
                                )}
                                {item.status === 'Ditolak' && (
                                  <TextAlert text={'Ditolak'} type="danger" />
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
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              {totalPageKomisi !== '0' && (
                <div className="float-md-right">
                  <DataTablePagination
                    page={currentPageKomisi - 1}
                    pages={totalPageKomisi}
                    canNext={currentPageKomisi < Number(totalPageKomisi)}
                    canPrevious={currentPageKomisi > 1}
                    onPageChange={(page) => setCurrentPageKomisi(page + 1)}
                    paginationMaxSize={
                      totalPageKomisi > 10 ? 10 : Number(totalPageKomisi)
                    }
                  />
                </div>
              )}
            </Colxx>
          </Row>
        </>
      )}
    </div>
  )
}

export default DetailFundraiser
