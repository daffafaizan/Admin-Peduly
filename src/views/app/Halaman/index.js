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
import dayToGo from 'helpers/DayToGo'

const orderOptions = [{ label: `Terbaru` }, { label: `Terlama` }]

const pageSizes = [4, 8, 12, 20]

const galangDana = [
  {
    id: 1,
    judul: 'bantu arya sembuh dari penyakit yang dideritanya selama ini',
    author: 'Human Initiative',
    target: 100000000,
    terkumpul: 35000000,
    batas: '2024-06-28T07:23:22.000000Z',
    status: 'aktif',
  },
  {
    id: 2,
    judul: 'Biaya Berobat Anak ',
    author: 'Involuntir',
    target: 100000000,
    terkumpul: 55500000,
    batas: '2022-11-28T07:23:22.000000Z',
    status: 'berakhir',
  },
  {
    id: 3,
    judul: 'Mari Bantu Bangun Hunian Darurat di Cianjur',
    author: 'Rumah Peduli Umat',
    target: 200000000,
    terkumpul: 1000000,
    batas: '',
    status: 'suspend',
  },
]

const initialData = orderData('Terbaru', galangDana)

const HalamanGalangDana = () => {
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
          <h1>Semua Galang Dana</h1>
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
                    <th style={{ borderTop: '0px' }}>Halaman Galang Dana</th>
                    <th style={{ borderTop: '0px' }}>Dibuat Oleh</th>
                    <th style={{ borderTop: '0px' }}>Target</th>
                    <th style={{ borderTop: '0px' }}>Terkumpul</th>
                    <th style={{ borderTop: '0px' }}>Sisa Waktu</th>
                    <th style={{ borderTop: '0px' }}>Terkumpul</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) => tr.judul.toLowerCase().includes(search))
                    .map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td
                          style={{
                            maxWidth: '300px',
                          }}
                        >
                          <p className="line-clamp" style={{ margin: '0px' }}>
                            {item.judul}
                          </p>
                        </td>
                        <td>{item.author}</td>
                        <td>Rp {IdrFormat(item.target)}</td>
                        <td>Rp {IdrFormat(item.terkumpul)}</td>
                        <td>
                          {dayToGo(item.batas) >= 0
                            ? `${dayToGo(item.batas)} Hari`
                            : '-'}
                        </td>
                        <td>
                          {item.status === 'aktif' && (
                            <p
                              className="text-success rounded text-center"
                              style={{
                                background: 'rgba(52, 168, 83, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '55px',
                                margin: '0px',
                              }}
                            >
                              Aktif
                            </p>
                          )}
                          {item.status === 'suspend' && (
                            <p
                              className="text-warning rounded text-center"
                              style={{
                                background: 'rgba(252, 174, 3, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '80px',
                                margin: '0px',
                              }}
                            >
                              Suspend
                            </p>
                          )}
                          {item.status === 'berakhir' && (
                            <p
                              className="text-danger rounded text-center"
                              style={{
                                background: 'rgba(231, 81, 59, 0.2)',
                                padding: '3px 12px',
                                maxWidth: '82px',
                                margin: '0px',
                              }}
                            >
                              Berakhir
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

export default HalamanGalangDana
