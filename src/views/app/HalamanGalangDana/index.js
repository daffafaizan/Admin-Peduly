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
import IdrFormat from 'helpers/IdrFormat'
import { useHistory } from 'react-router-dom'
import http from 'helpers/http'
import DataTablePagination from 'components/DatatablePagination'
import { API_ENDPOINT } from 'config/api'
import './index.scss'

const pageSizes = [20, 40, 80]
const orderOptions = ['Aktif', 'Berakhir']

const HalamanGalangDana = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    order: '',
  })

  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const history = useHistory()

  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getGalangDana()
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(filteredData().length / currentPageSize))
  }, [filteredData(), currentPageSize]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getGalangDana = () => {
    http
      .get(API_ENDPOINT.GET_LIST_GALANG_DANA_ADMIN)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.error('Error get galang dana data: ', err)
      })
  }

  function filteredData() {
    let g = data

    // SEARCH ALL
    g = data.filter((x) =>
      x.judul_campaign.toLowerCase().includes(filter.search.toLowerCase())
    )

    // ORDER
    if (filter.order === 'Aktif') {
      g = data.filter((x) => x.status === 'Active')
    }
    if (filter.order === 'Berakhir') {
      g = data.filter((x) => x.status === 'Done')
    }

    // SEARCH + ORDER
    if (filter.search && filter.order) {
      g = g.filter((x) =>
        x.judul_campaign.toLowerCase().includes(filter.search.toLowerCase())
      )
    }

    return g
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
                placeholder="Search galang dana..."
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
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
                    <th>Halaman Galang Dana</th>
                    <th>Dibuat Oleh</th>
                    <th>Target</th>
                    <th>Terkumpul</th>
                    <th>Sisa Waktu</th>
                    <th>Status</th>
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
                        <tr
                          key={item.id}
                          onClick={() =>
                            history.push(
                              `/app/halaman-galang-dana/detail/${item.id}`
                            )
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          <td>
                            {(currentPage - 1) * currentPageSize + index + 1}
                          </td>
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
                            {item.status === 'Suspend' && (
                              <p
                                className="text-warning rounded text-center status bg-status-pending"
                                style={{
                                  maxWidth: '80px',
                                }}
                              >
                                {item.status}
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

export default HalamanGalangDana
