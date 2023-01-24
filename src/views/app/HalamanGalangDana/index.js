/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
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
import { getCurrentColor } from 'helpers/Utils'
import IdrFormat from 'helpers/IdrFormat'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import DataTablePagination from 'components/DatatablePagination'
import './index.scss'

const orderOptions = [{ label: `Terbaru` }, { label: `Terlama` }]

const pageSizes = [20, 50, 100]

const HalamanGalangDana = () => {
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [dataGalangDana, setDataGalangDana] = useState([])
  const [search, setSearch] = useState('')
  const history = useHistory()

  useEffect(() => {
    getCurrentColor()
    getGalangDana()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const color = getCurrentColor()

  // get all users
  const token = Cookies.get('token')
  const getGalangDana = async () => {
    await axios
      .get(`https://dev.peduly.com/api/admin/galangdana`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const result = res.data.data
        const orderResult= result.sort((a, b) => b.id - a.id)
        setDataGalangDana(orderResult)
      })
      .catch((err) => {
        alert(err.data)
      })
  }

  const orderDataById = (option, data) => {
    let array
    if (option === 'Terbaru') {
      array = data.sort(function (a, b) {
        return b.id - a.id
      })
    } else if (option === 'Terlama') {
      array = data.sort(function (a, b) {
        return a.id - b.id
      })
    }
    return array
  }

  const handleOrder = (option) => {
    const array = orderDataById(option, dataGalangDana)
    setDataGalangDana(array)
    setSelectedOrder(option)
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
      setTotalPage(Math.ceil(dataGalangDana.length / currentPageSize))
  }, [currentPageSize, dataGalangDana])

  useEffect(() => {

    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
    
  }, [totalPage, currentPage])

  //search
  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const searching = (items) => {
    return items.filter((tr) =>
      tr.judul_campaign?.toLowerCase().includes(search)
    )
  }

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
            {currentPage === 1 && (
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Search..."
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="float-md-right pt-1">
            <span className="text-muted text-small mr-1">{!search && (`${currentPage} of ${totalPage}`)}</span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-dark" size="xs">
                {currentPageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizes.map((size, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => setCurrentPageSize(size)}
                    >
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
              <Table
                hover
                responsive
                className={!color.indexOf('dark') && 'table-dark-mode'}
              >
                <thead>
                  <tr>
                    <th style={{ borderTop: '0px' }}>#</th>
                    <th style={{ borderTop: '0px' }}>Halaman Galang Dana</th>
                    <th style={{ borderTop: '0px' }}>Dibuat Oleh</th>
                    <th style={{ borderTop: '0px' }}>Target</th>
                    <th style={{ borderTop: '0px' }}>Terkumpul</th>
                    <th style={{ borderTop: '0px' }}>Sisa Waktu</th>
                    <th style={{ borderTop: '0px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {searching(dataGalangDana)
                    .slice(
                      (currentPage - 1) * currentPageSize,
                      currentPage * currentPageSize
                    )
                    .map((item) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          history.push(
                            `/app/halaman-galang-dana/detail/${item.id}`
                          )
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{item.id}</td>
                        <td
                          style={{
                            maxWidth: '300px',
                          }}
                        >
                          <p className="line-clamp" style={{ margin: '0px' }}>
                            {item.judul_campaign}
                          </p>
                        </td>
                        <td>{item.name}</td>
                        <td>Rp {IdrFormat(item.nominal_campaign)}</td>
                        <td>Rp {IdrFormat(item.total_donasi)}</td>
                        <td>{item.sisa_waktu}</td>
                        <td>
                          {item.status === 'Approved' && (
                            <p
                              className="text-success rounded text-center status bg-status-success"
                              style={{
                                maxWidth: '100px',
                              }}
                            >
                              Approved
                            </p>
                          )}
                          {item.status === 'Pending' && (
                            <p
                              className="text-warning rounded text-center status bg-status-pending"
                              style={{
                                maxWidth: '80px',
                              }}
                            >
                              Pending
                            </p>
                          )}
                          {item.status === 'pendding' && (
                            <p
                              className="text-warning rounded text-center status bg-status-pending"
                              style={{
                                maxWidth: '80px',
                              }}
                            >
                              Pending
                            </p>
                          )}
                          {item.status === null && (
                            <p
                              style={{
                                maxWidth: '82px',
                              }}
                            >
                              -
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
      <Row>
        <Colxx>
          <div className="float-md-right">
            {search ? ("") : (<DataTablePagination
              page={currentPage - 1}
              pages={totalPage}
              canNext={currentPage < totalPage}
              canPrevious={currentPage > 1}
              onPageChange={(page) => setCurrentPage(page + 1)}
            />)}
          </div>
        </Colxx>
      </Row>
    </>
  )
}

export default HalamanGalangDana
