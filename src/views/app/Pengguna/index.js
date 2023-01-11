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
import pengguna from 'data/pengguna'
import { orderData } from 'helpers/Utils'
import DateFormat from 'helpers/DateFormat'

const orderOptions = [{ label: `Terbaru` }, { label: `Terlama` }]

const pageSizes = [4, 8, 12, 20]

const initialData = orderData('Terbaru', pengguna)

const Pengguna = () => {
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

  // const statusColor = (status) => {
  //   if(status === `Approved`) {
  //     return `success`;
  //   }

  //   if(status === `Pending`) {
  //     return `warning`;
  //   }

  //   return `danger`;
  // };

  // const onSearchKey = (e) => {
  //   if (e.key === 'Enter') {
  //     setSearch(e.target.value.toLowerCase());
  //   }
  // };

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
          <h1>Semua Pengguna</h1>
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
                    <th style={{ borderTop: '0px' }}>Username</th>
                    <th style={{ borderTop: '0px' }}>Email</th>
                    <th style={{ borderTop: '0px' }}>No. Telepon</th>
                    <th style={{ borderTop: '0px' }}>Role</th>
                    <th style={{ borderTop: '0px' }}>Tanggal</th>
                    <th style={{ borderTop: '0px' }}>Verifikasi Akun</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) => tr.nama.toLowerCase().includes(search))
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.telepon}</td>
                        <td>{item.role}</td>
                        <td>
                          {/* {formatter.format(Date.parse(item.created_at))} */}
                          {DateFormat(item.created_at)}
                        </td>
                        <td>
                          {item.verifikasi === 'terverifikasi' && (
                            <p
                              className="text-success rounded text-center"
                              style={{
                                background: 'rgba(52, 168, 83, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '105px',
                              }}
                            >
                              Terverifikasi
                            </p>
                          )}
                          {item.verifikasi === 'pending' && (
                            <p
                              className="text-warning rounded text-center"
                              style={{
                                background: 'rgba(252, 174, 3, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '80px',
                              }}
                            >
                              pending
                            </p>
                          )}
                          {item.verifikasi === 'tidak' && (
                            <p
                              className="text-danger rounded text-center"
                              style={{
                                background: 'rgba(231, 81, 59, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '62px',
                              }}
                            >
                              Tidak
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

export default Pengguna
