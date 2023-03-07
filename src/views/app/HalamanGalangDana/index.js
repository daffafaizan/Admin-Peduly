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
import http from 'helpers/http'
import DataTablePagination from 'components/DatatablePagination'
import { orderDataById, orderOptions, pageSizes } from 'helpers/OrderData'
import { API_ENDPOINT } from 'config/api'
import './index.scss'

const HalamanGalangDana = () => {
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [dataGalangDana, setDataGalangDana] = useState([])
  const [filteredData, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const history = useHistory()

  useEffect(() => {
    getCurrentColor()
    getGalangDana()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const color = getCurrentColor()

  // get all users
  const getGalangDana = async () => {
    await http
      .get(API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN)
      .then((res) => {
        const result = res.data.data
        const orderResult= result.sort((a, b) => b.id - a.id)
        setDataGalangDana(orderResult)
      })
      .catch((err) => {
        alert(err.data)
      })
  }

  const handleOrder = (option) => {
    const array = orderDataById(option, filteredData)
    setFiltered(array)
    setSelectedOrder(option)
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setFiltered(
      dataGalangDana.filter((tr) => {
        return tr.judul_campaign?.toLowerCase().includes(search)
      })
    )
  }, [dataGalangDana, search])

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData.length / currentPageSize))
  }, [filteredData, currentPageSize])

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
                  placeholder="Search galang dana..."
                  onChange={handleChange}
                />
              </div>
          </div>
          <div className="float-md-right pt-1">
            <span className="text-muted text-small mr-1">{`${currentPage} of ${totalPage}`}</span>
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
            <CardBody style={{ padding: '12px' }}>
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
                  {filteredData
                    .slice(
                      (currentPage - 1) * currentPageSize,
                      currentPage * currentPageSize
                    )
                    .map((item, idx) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          history.push(
                            `/app/halaman-galang-dana/detail/${item.id}`
                          )
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{(currentPage - 1) * currentPageSize + idx + 1}</td>
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
                          {item.status === 'Active' && (
                            <p
                              className="text-success rounded text-center status bg-status-success"
                              style={{
                                maxWidth: '100px',
                              }}
                            >
                              Aktif
                            </p>
                          )}
                          {item.status === 'Done' && (
                            <p
                              className="text-danger rounded text-center status bg-status-danger"
                              style={{
                                maxWidth: '100px',
                              }}
                            >
                              Berakhir
                            </p>
                          )}
                          {item.status === 'Pending' && (
                            <p
                              className="text-warning rounded text-center status bg-status-pending"
                              style={{
                                maxWidth: '100px',
                              }}
                            >
                            {item.status}
                            </p>
                          )}
                          {item.status === 'Suspend' && (
                            <p
                              className="text-warning rounded text-center status bg-status-pending"
                              style={{
                                maxWidth: '100px',
                              }}
                            >
                            {item.status}
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
          <DataTablePagination
              page={currentPage - 1}
              pages={totalPage}
              canNext={currentPage < totalPage}
              canPrevious={currentPage > 1}
              onPageChange={(page) => setCurrentPage(page + 1)}
            />
          </div>
        </Colxx>
      </Row>
    </>
  )
}

export default HalamanGalangDana
