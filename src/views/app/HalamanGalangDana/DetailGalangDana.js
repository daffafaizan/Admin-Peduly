/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
import useMousetrap from 'hooks/use-mousetrap'
import { orderData } from 'helpers/Utils'
import IdrFormat from 'helpers/IdrFormat'
import DateFormat from 'helpers/DateFormat'
import Breadcrumb from 'containers/navs/Breadcrumb'
import { Link } from 'react-router-dom'
import './index.css'

const orderOptions = [{ label: `Terbaru` }, { label: `Terlama` }]

const pageSizes = [4, 8, 12, 20]

const galangDana = [
  {
    id: 1,
    name: 'Firda Yuningsih',
    nominal: 100000,
    bpg: 100000,
    referal: 0,
    ba: 100000,
    payable: 100000,
    status: 'berhasil',
    created_at: '2022-01-28T07:23:22.000000Z',
  },
  {
    id: 2,
    name: 'warga baik',
    nominal: 12000000,
    bpg: 12000000,
    referal: 12000000,
    ba: 12000000,
    payable: 12000000,
    status: 'dibatalkan',
    created_at: '2023-01-28T07:23:22.000000Z',
  },
  {
    id: 2,
    name: 'Ratu Zulika',
    nominal: 10000,
    bpg: 10000,
    referal: 10000,
    ba: 10000,
    payable: 10000,
    status: 'pending',
    created_at: '2023-02-28T07:23:22.000000Z',
  },
]

const initialData = orderData('Terbaru', galangDana)

const DetailGalangDana = ({ match }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleOrder = (option) => {
    const array = orderData(option, initialData)
    setData(array)
    setSelectedOrder(option)
  }

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= initialData.length) {
      if (isToggle) {
        setSelectedItems([])
      }
    } else {
      setSelectedItems(initialData.map((x) => x.id))
    }
    document.activeElement.blur()
    return false
  }

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false)
  })

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([])
    return false
  })

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb match={match} />
          <Separator className="mb-3" />
        </Colxx>
      </Row>
      <div className="d-flex" style={{ marginBottom: '38px' }}>
        <div className="d-flex justify-content-beetwen">
          <a
            href="https://peduly.com/donasi-sekali/bantubututi"
            className="text-danger"
            style={{ fontSize: '24px' }}
          >
            Alami Katarak,Bu Tuti jadi butuh bangunan demi pengobatan suami
          </a>
          <Link
            to="/error"
            className="rounded border-status-danger text-danger"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            Edit Galang Dana
          </Link>
        </div>
      </div>
      <Row>
        <Colxx xxs="3">
          <div className="card" style={{ borderRadius: '15px' }}>
            <div className="d-block" style={{ padding: '50px' }}>
              <svg
                className="mx-auto w-full icon"
                // style={{ width: '100%', marginBottom: '22px' }}
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
              <p
                className="text-peduly-dark mx-auto text-center text"
                // style={{
                //   fontSize: '14px',
                //   width: '100%',
                //   marginBottom: '30px',
                // }}
              >
                Dana Terkumpul
              </p>
              <p className="text-danger nominal">Rp78.050.000</p>
            </div>
          </div>
        </Colxx>
        <Colxx xxs="3">
          <div className="card" style={{ borderRadius: '15px' }}>
            <div className="d-block" style={{ padding: '50px' }}>
              <svg
                className="mx-auto"
                style={{ width: '100%', marginBottom: '22px' }}
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
              <p
                className="text-peduly-dark mx-auto text-center"
                style={{
                  fontSize: '14px',
                  width: '100%',
                  marginBottom: '30px',
                }}
              >
                Dana Terkumpul
              </p>
              <p className="text-danger" style={{ fontSize: '28px' }}>
                Rp78.050.000
              </p>
            </div>
          </div>
        </Colxx>
        <Colxx xxs="3">
          <div className="card" style={{ borderRadius: '15px' }}>
            <div className="d-block" style={{ padding: '50px' }}>
              <svg
                className="mx-auto"
                style={{ width: '100%', marginBottom: '22px' }}
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
              <p
                className="text-peduly-dark mx-auto text-center"
                style={{
                  fontSize: '14px',
                  width: '100%',
                  marginBottom: '30px',
                }}
              >
                Dana Terkumpul
              </p>
              <p className="text-danger" style={{ fontSize: '28px' }}>
                Rp78.050.000
              </p>
            </div>
          </div>
        </Colxx>
        <Colxx xxs="3">
          <div className="card" style={{ borderRadius: '15px' }}>
            <div className="d-block" style={{ padding: '50px' }}>
              <svg
                className="mx-auto"
                style={{ width: '100%', marginBottom: '22px' }}
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
              <p
                className="text-peduly-dark mx-auto text-center"
                style={{
                  fontSize: '14px',
                  width: '100%',
                  marginBottom: '30px',
                }}
              >
                Dana Terkumpul
              </p>
              <p className="text-danger" style={{ fontSize: '28px' }}>
                Rp78.050.000
              </p>
            </div>
          </div>
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
                placeholder="Search..."
                // onKeyPress={(e) => onSearchKey(e)}
                onChange={handleChange}
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
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <CardBody style={{ padding: '24px' }}>
              <Table hover responsive>
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
                  {data
                    .filter((tr) => tr.name.toLowerCase().includes(search))
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{DateFormat(item.created_at)}</td>
                        <td>Rp {IdrFormat(item.nominal)}</td>
                        <td>Rp {IdrFormat(item.bpg)}</td>
                        <td>Rp {IdrFormat(item.referal)}</td>
                        <td>Rp {IdrFormat(item.ba)}</td>
                        <td>Rp {IdrFormat(item.payable)}</td>
                        <td>
                          {item.status === 'berhasil' && (
                            <p
                              className="text-success rounded text-center status bg-status-success"
                              style={{
                                maxWidth: '77px',
                              }}
                            >
                              Berhasil
                            </p>
                          )}
                          {item.status === 'pending' && (
                            <p
                              className="text-warning rounded text-center status bg-status-pending"
                              style={{
                                maxWidth: '78px',
                              }}
                            >
                              Pending
                            </p>
                          )}
                          {item.status === 'dibatalkan' && (
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
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default DetailGalangDana
