/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  // Badge,
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
  const [campaignList, setCampaignList] = useState([])
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('Terbaru')

  // Pagination
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    getCurrentColor
  }, [])

  const color = getCurrentColor()

  useEffect(() => {
    getTransaksiData()
    getCampaignData()
  }, [])

  useEffect(() => {
    const filterData = filterSearchData()
    setTotalPage(Math.ceil(filterData.length / selectedPageSize))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageSize, data, search])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

  const getTransaksiData = () => {
    http
      .get(API_ENDPOINT.GET_ALL_TRANSAKSI)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('Error get transaksi data: ', err)
      })
  }

  const getCampaignData = () => {
    http
      .get(API_ENDPOINT.GET_LIST_GALANG_DANA)
      .then((res) => {
        setCampaignList(res.data.data)
      })
      .catch((err) => {
        console.log('Error get campaign data: ', err)
      })
  }

  const getCampaignDataById = (campaignId) => {
    return campaignList?.find((x) => {
      return x.id.toString() === campaignId
    })
  }

  const filterSearchData = () => {
    return data?.filter((x) => {
      return x.id.toString().includes(search)
    })
  }

  const orderData = () => {
    const filterData = filterSearchData()
    if (selectedOrder === 'Terbaru') {
      return filterData?.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    }

    if (selectedOrder === 'Terlama') {
      return filterData?.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at)
      })
    }

    return filterData
  }

  const handleChangeOrder = (value) => {
    setSelectedOrder(value)
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
                <IntlMessages id="pages.orderby" /> {selectedOrder}
              </DropdownToggle>
              <DropdownMenu>
                {orderOptions.map((order, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => handleChangeOrder(order)}
                    >
                      {order}
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
                onChange={(e) => setSearch(e.target.value)}
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
                {pageSizes.map((size, index) => {
                  return (
                    <DropdownItem key={index} onClick={() => {}}>
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
                    <th>User</th>
                    <th>Tanggal</th>
                    <th>ID Transaksi</th>
                    <th>ID GD</th>
                    <th>Nominal</th>
                    <th>Metode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData()
                    .slice(
                      (currentPage - 1) * selectedPageSize,
                      currentPage * selectedPageSize
                    )
                    .map((item, index) => (
                      <tr key={`item-${index}`}>
                        <td>
                          {index + (currentPage - 1) * selectedPageSize + 1}
                        </td>
                        <td className="judul-campaign">
                          {getCampaignDataById(item.campaign_id)
                            ? getCampaignDataById(item.campaign_id)
                                .judul_campaign
                            : '-'}
                        </td>
                        <td>
                          {item.user_id ? (
                            <TextAlert text={'Terdaftar'} />
                          ) : (
                            <TextAlert text={'Tidak Terdaftar'} type="danger" />
                          )}
                        </td>
                        <td>
                          {item.created_at
                            ? moment(item.created_at).format('DD/MM/YYYY')
                            : '-'}
                        </td>
                        <td>
                          {/* {item.kode_donasi} */}
                          {item.id}
                        </td>
                        <td>
                          {/* {item.campaign_id} */}
                          {item.campaign_id}
                        </td>
                        <td>
                          {/* {item.nominal_campaign} */}
                          Rp {IdrFormat(item.donasi)}
                        </td>
                        <td>{item.metode_pembayaran}</td>
                        <td>
                          {/* {item.status_donasi} */}
                          {/* Berhasil || Pending || Dibatalkan */}
                          {item.status_donasi === 'Approved' && (
                            <TextAlert text={'Berhasil'} />
                          )}
                          {item.status_donasi === 'Pending' && (
                            <TextAlert text={'Pending'} type="warning" />
                          )}
                          {(item.status_donasi === 'Rejected' ||
                            item.status_donasi === 'Refund') && (
                            <TextAlert text={'Dibatalkan'} type="danger" />
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
        {/* <Pagination totalPage={10} currentPage={1} numberLimit={1} /> */}
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

export default TransaksiDonasi
