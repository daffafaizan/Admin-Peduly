import { useState, useEffect } from 'react'
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
import './index.scss'
import http from 'helpers/http'
import DataTablePagination from 'components/DatatablePagination'
import { API_ENDPOINT } from 'config/api'
import { useHistory } from 'react-router-dom'

const pageSizes = [20, 40, 80]
const orderOptions = ['Terbaru', 'Terlama']

const Pengguna = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    order: 'Terbaru',
  })
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const history = useHistory()
  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getUsers()
  }, [])

  useEffect(() => {
    setTotalPage((filteredData().length / currentPageSize).toFixed())
  }, [filteredData(), currentPageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getUsers = () => {
    http
      .get(API_ENDPOINT.GET_ALL_USER)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.error('Error get users data: ', err)
      })
  }

  function filteredData() {
    let u

    // ORDER
    if (filter.order === 'Terbaru') {
      u = data.sort((a, b) => {
        return new Date(b.tanggal_dibuat) - new Date(a.tanggal_dibuat)
      })
    }

    if (filter.order === 'Terlama') {
      u = data.sort((a, b) => {
        return new Date(a.tanggal_dibuat) - new Date(b.tanggal_dibuat)
      })
    }

    // SEARCH
    u = data.filter((x) =>
      x.name?.toLowerCase().includes(filter.search.toLowerCase())
    )

    return u
  }

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
                <IntlMessages id="pages.orderby" /> {filter.order}
              </DropdownToggle>
              <DropdownMenu>
                {orderOptions.map((order, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => setFilter({ ...filter, order })}
                  >
                    {order}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search pengguna..."
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
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
                {pageSizes.map((size, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => setCurrentPageSize(size)}
                  >
                    {size}
                  </DropdownItem>
                ))}
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
                  {filteredData().length !== 0 ? (
                    filteredData()
                      .slice(
                        (currentPage - 1) * currentPageSize,
                        currentPage * currentPageSize
                      )
                      .map((item, index) => (
                        <tr key={index} onClick={() => {
                          history.push(`/app/pengguna/detail/${item.id}`)
                        }} style={{ cursor: 'pointer' }}>
                          <td>
                            {(currentPage - 1) * currentPageSize + index + 1}
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {item.username === null ? '-' : item.username}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.no_telp === null ? '-' : item.no_telp}</td>
                          <td>{item.role}</td>
                          <td>{item.tanggal_dibuat.substring(0, 10)}</td>
                          <td>
                            {item.is_verified === 'Verified' && (
                              <p className="text-success rounded text-center status status-success bg-status-success">
                                {item.is_verified}
                              </p>
                            )}
                            {item.is_verified === 'Pending' && (
                              <p className="text-warning rounded text-center status status-pending bg-status-pending">
                                {item.is_verified}
                              </p>
                            )}
                            {item.is_verified === null && (
                              <p className="text-danger rounded text-center status status-danger bg-status-danger">
                                {item.is_verified}
                              </p>
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
          {totalPage !== '0' && (
            <div className="float-md-right">
              <DataTablePagination
                page={currentPage - 1}
                pages={totalPage}
                canNext={currentPage < Number(totalPage)}
                canPrevious={currentPage > 1}
                onPageChange={(page) => setCurrentPage(page + 1)}
                paginationMaxSize={totalPage > 10 ? 10 : Number(totalPage)}
              />
            </div>
          )}
        </Colxx>
      </Row>
    </>
  )
}

export default Pengguna
