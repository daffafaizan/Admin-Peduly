/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  // Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
import { orderData } from 'helpers/Utils'
import axios from 'axios'
import transaksi from 'data/transaksi-donasi'
import IdrFormat from 'helpers/IdrFormat'
import DateFormat from 'helpers/DateFormat'
import './index.scss'
// import axios from 'axios';

const orderOptions = [
  { label: `Terbaru` },
  { label: `Terlama` },
  { label: `Paling Tinggi` },
  { label: `Paling Rendah` },
]

const pageSizes = [4, 8, 12, 20]

const initialData = orderData('Terbaru', transaksi)

const TransaksiDonasi = () => {
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [status] = useState(true)

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get('https://api.peduly.com/api/galangdana')
    setData(response.data.data)
    // console.log(response.data.data[0].item.status_donasi);
  }

  const handleOrder = (option) => {
    const array = orderData(option, initialData)
    setData(array)
    setSelectedOrder(option)
  }

  // const statusColor = (status) => {
  //   if (status === `Approved`) {
  //     return `success`;
  //   }

  //   if (status === `Pending`) {
  //     return `warning`;
  //   }

  //   return `danger`;
  // };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Semua Transaksi</h1>
          <Separator className="mb-3" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-3">
          <div className="d-block d-md-inline-block pt-1">
            <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
              <DropdownToggle caret color="outline-dark" size="xs">
                <IntlMessages id="pages.orderby" /> {selectedOrder}
              </DropdownToggle>
              <DropdownMenu>
                {orderOptions.map((order, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => handleOrder(order.label)}
                    >
                      {order.label}
                    </DropdownItem>
                  )
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search transaksi"
                // onKeyPress={(e) => onSearchKey(e)}
                onChange={handleChange}
                // value={search}
              />
            </div>
          </div>
          <div className="float-md-right pt-1">
            <span className="text-muted text-small mr-1">{`1 of 1 `}</span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-dark" size="xs">
                {' '}
                8{/* {selectedPageSize} */}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizes.map((size, index) => {
                  return (
                    <DropdownItem key={index} onClick="">
                      {size}
                    </DropdownItem>
                  )
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Colxx>
      </Row>
      <Row>
        <Colxx xs="12" className="mb-4">
          <Card className="mb-4 card-rounded">
            <CardBody className="card-body">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>User</th>
                    <th>Tanggal</th>
                    <th>ID Transaksi</th>
                    <th>ID GD</th>
                    <th>Nominal</th>
                    <th>Metode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) =>
                      tr.judul_campaign.toLowerCase().includes(search)
                    )
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td className="judul-campaign">
                          {item.judul_campaign}
                        </td>
                        <td>
                          {status ? (
                            <p className="text-success text-center rounded status status-success border-status-success">
                              Terdaftar
                            </p>
                          ) : (
                            <p className="text-danger text-center rounded status status-danger border-status-danger">
                              Tidak
                            </p>
                          )}
                        </td>
                        <td>{DateFormat(item.created_at)}</td>
                        <td>
                          {/* {item.kode_donasi} */}
                          INV83452879
                        </td>
                        <td>
                          {/* {item.campaign_id} */}
                          10553
                        </td>
                        <td>
                          {/* {item.nominal_campaign} */}
                          Rp {IdrFormat(item.nominal_campaign)}
                        </td>
                        <td>
                          {item.metode_pembayaran}
                          Gopay
                        </td>
                        <td>
                          {/* {item.status_donasi} */}
                          {true && (
                            <p className="text-success rounded text-center status status-verifikasi-success bg-status-success">
                              Berhasil
                            </p>
                          )}
                          {false && (
                            <p className="text-warning rounded text-center status status-verifikasi-pending bg-status-pending">
                              pending
                            </p>
                          )}
                          {false && (
                            <p className="text-danger rounded text-center status status-verifikasi-danger  bg-status-danger">
                              Dibatalkan
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        {/* <Pagination totalPage={10} currentPage={1} numberLimit={1} /> */}
      </Row>
    </>
  )
}

export default TransaksiDonasi
