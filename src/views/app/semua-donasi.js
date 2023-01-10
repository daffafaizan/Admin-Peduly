/* eslint-disable react/no-array-index-key */

import React, { useState, useEffect } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
// import transaksi from 'data/transaksi-donasi';
import { orderData } from 'helpers/Utils'
import axios from 'axios'
import transaksi from 'data/transaksi-donasi'
import Pagination from 'containers/pages/Pagination'
// import axios from 'axios';

const orderOptions = [
  { label: `Terbaru` },
  { label: `Terlama` },
  { label: `Paling Tinggi` },
  { label: `Paling Rendah` },
]

const pageSizes = [4, 8, 12, 20]

const initialData = orderData('Terbaru', transaksi)

const SemuaDonasi = () => {
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get('https://dev.peduly.com/api/galangdana')
    setData(response.data.data)
  }

  const handleOrder = (option) => {
    const array = orderData(option, initialData)
    setData(array)
    setSelectedOrder(option)
  }

  const statusColor = (status) => {
    if (status === `Approved`) {
      return `success`
    }

    if (status === `Pending`) {
      return `warning`
    }

    return `danger`
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Transaksi Donasi</h1>
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
          <Card className="mb-4">
            <CardBody>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Halaman Galang Dana</th>
                    <th>Dibuat Oleh</th>
                    <th>Target</th>
                    <th>Terkumpul</th>
                    <th>Sisa Waktu</th>
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
                        <td>{item.judul_campaign}</td>
                        <td>
                          <Badge color="success" pill>
                            Terdaftar
                          </Badge>
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.kode_donasi}</td>
                        <td>{item.campaign_id}</td>
                        <td>{item.nominal_campaign}</td>
                        <td>{item.metode_pembayaran}</td>
                        <td>
                          <Badge color={statusColor(item.status_donasi)} pill>
                            {item.status_donasi}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        <Pagination totalPage={10} currentPage={1} numberLimit={2} />
      </Row>
    </>
  )
}

export default SemuaDonasi
