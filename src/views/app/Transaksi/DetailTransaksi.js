import { useState, useEffect } from 'react'
import {
  Card,
  Row,
  CardBody,
  Col,
  Label,
  FormGroup,
} from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import './index.scss'
import { API_ENDPOINT, API_URL } from 'config/api'
import { useParams } from 'react-router-dom'
import http from 'helpers/http'
import IdrFormat from 'helpers/IdrFormat'
import moment from 'moment'

const konversiToNumber = (angka) => {
  const idrFormat = IdrFormat(parseInt(angka))
  if (!isNaN(idrFormat)) {
    return idrFormat
  } else {
    return 0
  }
}

function cekPanjangObject(obj) {
  return Object.keys(obj).length
}

const DetailTransaksi = () => {
  const [detail, setDetail] = useState([])
  // const [detailDonasi, setDetailDonasi] = useState([])
  const { id } = useParams()

  useEffect(() => {
    if (id) getDetailTransaksi()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const getDetailTransaksi = () => {
    http
      .get(`${API_ENDPOINT.GET_DETAIL_TRANSAKSI}/${id}`)
      .then((res) => {
        const dataDonasiCOD = res.data.data.donasi
        const dataDonasiAll = res.data.data
        console.log(dataDonasiCOD, dataDonasiAll)
        console.log(cekPanjangObject(dataDonasiCOD))
        if (cekPanjangObject(dataDonasiCOD) >= 8 && cekPanjangObject(dataDonasiAll) >= 1) {
          setDetail(dataDonasiCOD)
        } else {
          setDetail(dataDonasiAll)
        }

      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  console.log(detail)

  const tanggalPembayaran = (tanggal) => {
    if (tanggal === null && detail.status_donasi === 'Pending') {
      return "Menunggu Pembayaran"
    } else if (tanggal !== null && detail.status_donasi === 'Approved') {
      return tanggal
    } else if (tanggal === null && detail.status_donasi === 'Rejected') {
      return "Transaksi Dibatalkan"
    } else {
      return "-"
    }
  }

  const metodePembayaran = () => {
    if (detail.metode_pembayaran === 'emoney') {
      return detail.emoney_name
    } else if (detail.metode_pembayaran === 'bank_transfer') {
      return detail.bank_name
    } else {
      return detail.metode_pembayaran
    }
  }

  return (
    <>
      <Row>
        <Colxx xxs="12" className="m-3">
          <h1 className="judul mb-heading">Detail Transaksi</h1>
        </Colxx>
      </Row>
      <div className="slide-page">
        <Row className="rounded">
          <Colxx xs="12" className="mb-4">
            <Card className="mb-4">
              <CardBody>
                <div className="d-flex">
                  {/* col 1 */}
                  <div className="col-4">
                    <FormGroup>
                      <Label for="namalengkap" lg={12} className="detail-transaksi-label mb-1">
                        Nama Lengkap
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text"> {detail.nama}
                        </p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="metodePembayaran" lg={12} className="detail-transaksi-label mb-1">
                        Metode Pembayaran
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text"> {metodePembayaran()}</p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nominalDonasi" lg={12} className="detail-transaksi-label mb-1">
                        Nominal Donasi
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">Rp {konversiToNumber(detail.donasi)}</p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nominalDonasi" lg={12} className="detail-transaksi-label mb-1">
                        Total Donasi
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">Rp {konversiToNumber(detail.total_donasi_bersih)}</p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nominalDonasi" lg={12} className="detail-transaksi-label mb-1">
                        Tujuan Donasi
                      </Label>
                      <Col lg={12}>
                        <a href={`${API_URL}/${detail.judul_slug}`} className="detail-transaksi-link pb-4" target="_blank" rel="noreferrer">{detail.judul_campaign}</a>
                        <div className="detail-transaksi-box-link mt-3"></div>
                      </Col>
                    </FormGroup>
                  </div>

                  {/* col 2 */}
                  <div className="col-4">
                    <FormGroup>
                      <Label for="idTransaksi" lg={12} className="detail-transaksi-label mb-1">
                        ID Transaksi
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">{detail.kode_donasi}</p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="metodePembayaran" lg={12} className="detail-transaksi-label mb-1">
                        Pembuatan Invoice
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">{moment(detail.created_at).format("YYYY-MM-DD hh:mm:ss")}</p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nominalDonasi" lg={12} className="detail-transaksi-label mb-1">
                        Biaya Payment Gateway
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">-Rp {konversiToNumber(detail.biaya_payment_gateway)}</p>
                      </Col>
                    </FormGroup>

                  </div>
                  {/* col 3 */}
                  <div className="col-4">
                    <FormGroup>
                      <Label for="status" lg={12} className="detail-transaksi-label mb-1">
                        Status
                      </Label>
                      <Col lg={12}>
                        {detail.status_donasi === 'Approved' ? (<p className="detail-transaksi-text text-success">Berhasil</p>) : (<p className="detail-transaksi-text">{detail.status_donasi}</p>)}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="metodePembayaran" lg={12} className="detail-transaksi-label mb-1">
                        Pembayaran Invoice
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">{detail.metode_pembayaran !== 'balance' ? tanggalPembayaran(detail.paid_at) : '-'} </p>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Label for="nominalDonasi" lg={12} className="detail-transaksi-label mb-1">
                        Biaya Administrasi
                      </Label>
                      <Col lg={12}>
                        <p className="detail-transaksi-text">-Rp {konversiToNumber(detail.biaya_administrasi)}</p>
                      </Col>
                    </FormGroup>
                  </div>

                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

      </div>
    </>
  )
}

export default DetailTransaksi
