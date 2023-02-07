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
  Spinner,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
import { getCurrentColor } from 'helpers/Utils'
import './index.scss'
import http from 'helpers/http'
import DataTablePagination from 'components/DatatablePagination'
import { orderDataByDate, orderOptions, pageSizes } from 'helpers/OrderData'
import { API_ENDPOINT } from 'config/api'

const Pengguna = () => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')
  const [dataPengguna, setDataPengguna] = useState([])
  const [filteredData, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    getCurrentColor()

    getUsers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // get all users
  const getUsers = async () => {
    setDisplay(true)
    await http
      .get(API_ENDPOINT.GET_ALL_USER)
      .then((res) => {
        const result = res.data.data
        const orderResult = orderDataByDate('Terbaru', result)
        setDataPengguna(orderResult)
        setDisplay(false)
      })
      .catch((err) => {
        alert(err.data)
        setDisplay(false)
      })
  }

  const color = getCurrentColor()

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleOrder = (option) => {
    const array = orderDataByDate(option, filteredData)
    setFiltered(array)
    setSelectedOrder(option)
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    setFiltered(
      dataPengguna.filter((tr) => {
        return tr.is_verified?.toLowerCase().includes(search)
      })
    )
  }, [dataPengguna, search])

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData.length / currentPageSize))
  }, [filteredData, currentPageSize])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

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
                placeholder="Search pengguna..."
                value={search}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="float-md-right pt-1">
            <span className="text-muted text-small mr-1">
              {`${currentPage} of ${totalPage}`}
            </span>
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
          <Card className="mb-4 card-rounded">
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>No. Telepon</th>
                    <th>Role</th>
                    <th>Tanggal</th>
                    <th>Verifikasi Akun</th>
                  </tr>
                </thead>
                <tbody>
                  {display ? (
                    <tr>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                      <td className="spinner-table">
                        <Spinner color="primary">Loading...</Spinner>
                      </td>
                    </tr>
                  ) : (
                    filteredData
                      .slice(
                        (currentPage - 1) * currentPageSize,
                        currentPage * currentPageSize
                      )
                      .map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            {(currentPage - 1) * currentPageSize + idx + 1}
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {item.username === null ? '-' : item.username}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.no_telp === null ? '-' : item.no_telp}</td>
                          <td>{item.role}</td>
                          <td>{item.tanggal_dibuat}</td>
                          <td>
                            {item.is_verified=== 'Verified' && (
                            <p className="text-success rounded text-center status status-success bg-status-success">
                              Terverifikasi
                            </p>
                          )}
                          {item.is_verified === 'Pending' && (
                            <p className="text-warning rounded text-center status status-pending bg-status-pending">
                              {item.is_verified}
                            </p>
                          )}
                          {item.is_verified === null && (
                            <p className="text-danger rounded text-center status status-danger bg-status-danger">
                              Tidak
                            </p>
                          )}
                          </td>
                        </tr>
                      ))
                  )}
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
              paginationMaxSize={10}
            />
          </div>
        </Colxx>
      </Row>
    </>
  )
}

export default Pengguna
