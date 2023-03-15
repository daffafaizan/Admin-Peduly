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
import TextAlert from 'components/TextAlert'
import IntlMessages from 'helpers/IntlMessages'
import moment from 'moment'
import IdrFormat from 'helpers/IdrFormat'
import { getCurrentColor } from 'helpers/Utils'
import './index.scss'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'
import DataTablePagination from 'components/DatatablePagination'

const pageSizes = [20, 40, 80]
const orderOptions = ['Terbaru', 'Terlama']

const TransaksiDonasi = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    order: 'Terbaru',
  })
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getTransaksiData()
  }, [])

  useEffect(() => {
    setTotalPage((filteredData().length / selectedPageSize).toFixed())
  }, [selectedPageSize, filteredData()]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getTransaksiData = () => {
    http
      .get(API_ENDPOINT.GET_ALL_TRANSAKSI)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error('Error get transaksi data: ', err)
      })
  }

  function filteredData() {
    let x

    // ORDER
    if (filter.order === 'Terbaru') {
      x = data.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    }

    if (filter.order === 'Terlama') {
      x = data.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
    }

    // SEARCH
    x = data.filter((x) => x.id.toString().includes(filter.search))

    return x
  }

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
                placeholder="Search transaksi"
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
                {selectedPageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizes.map((size, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      setSelectedPageSize(size)
                    }}
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
        <Colxx xs="12" className="mb-4">
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
                    <th>Id Transaksi</th>
                    <th>User</th>
                    <th>Tanggal</th>
                    <th>User Id</th>
                    <th>Id GD</th>
                    <th>Nominal</th>
                    <th>Metode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData().length !== 0 ? (
                    filteredData()
                      .slice(
                        (currentPage - 1) * selectedPageSize,
                        currentPage * selectedPageSize
                      )
                      .map((item, index) => (
                        <tr key={`item-${index}`}>
                          <td>
                            {index + (currentPage - 1) * selectedPageSize + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>
                            {item.user_id ? (
                              <TextAlert text={'Terdaftar'} />
                            ) : (
                              <TextAlert
                                text={'Tidak Terdaftar'}
                                type="danger"
                              />
                            )}
                          </td>
                          <td>
                            {item.created_at
                              ? moment(item.created_at).format('DD/MM/YYYY')
                              : '-'}
                          </td>
                          <td>
                            {item.user_id === '1' ? 'Anonim' : item.user_id}
                          </td>
                          <td>
                            {item.galangdana_id ? item.galangdana_id : '-'}
                          </td>
                          <td>Rp {IdrFormat(item.donasi)}</td>
                          <td>{item.metode_pembayaran}</td>
                          <td>
                            {item.status_donasi === 'Approved' && (
                              <TextAlert text={'Berhasil'} />
                            )}
                            {item.status_donasi === 'Pending' && (
                              <TextAlert text={'Pending'} type="warning" />
                            )}
                            {(!item.status_donasi ||
                              item.status_donasi === 'Denied' ||
                              item.status_donasi === 'Rejected' ||
                              item.status_donasi === 'Refund') && (
                              <TextAlert text={'Dibatalkan'} type="danger" />
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

export default TransaksiDonasi
