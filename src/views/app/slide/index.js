/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import './index.scss'
import moment from 'moment'
import DataTablePagination from 'components/DatatablePagination'
import TextAlert from 'components/TextAlert'
import { useHistory } from 'react-router-dom'
import { getCurrentColor } from 'helpers/Utils'
import axios from 'axios'

const pageSizes = [20, 40, 80]

const SlidePage = () => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [data, setData] = useState([])
  const [search] = useState('')
  const history = useHistory()

  useEffect(() => {
    getSlidesData()
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(data.length / currentPageSize))
  }, [currentPageSize, data])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

  useEffect(() => {
    getCurrentColor()
  }, [])

  const color = getCurrentColor()
  const getSlidesData = () => {
    axios
      .get('https://dev.peduly.com/api/slides')
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  return (
    <div className="slide-page">
      <Row>
        <Colxx xxs="12">
          <h1>Semua Slide</h1>
          <Button
            className="float-right"
            onClick={() => history.push('/app/slide/add')}
          >
            Buat Slide Baru
          </Button>
          <Separator />
        </Colxx>
      </Row>
      <Row style={{ margin: '12px 0' }}>
        <Col style={{ padding: 0 }}>
          <div className="float-right">
            <span className="text-muted text-small mr-1">{`${currentPage} of ${totalPage} `}</span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-dark" size="xs">
                {' '}
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
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <CardBody style={{ padding: '12px' }}>
              <Table
                className={`table-slide ${
                  !color.indexOf('dark') && 'table-dark-mode'
                }`}
                hover
                responsive
              >
                <thead>
                  <tr className="nowrap">
                    <th style={{ borderTop: '0px' }}>#</th>
                    <th style={{ borderTop: '0px' }}>Gambar Slide</th>
                    <th style={{ borderTop: '0px' }}>Judul</th>
                    <th style={{ borderTop: '0px' }}>Direct Link</th>
                    <th style={{ borderTop: '0px' }}>Tanggal Mulai</th>
                    <th style={{ borderTop: '0px' }}>Tanggal Berakhir</th>
                    <th style={{ borderTop: '0px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) => tr.title.toLowerCase().includes(search))
                    .sort((a, b) => {
                      return b.id - a.id
                    })
                    .slice(
                      (currentPage - 1) * currentPageSize,
                      currentPage * currentPageSize
                    )
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          history.push(`/app/slide/edit/${item.id}`)
                        }
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div className="slide-image-container">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="slide-image"
                            />
                          </div>
                        </td>
                        <td>
                          <p className="line-clamp">{item.title}</p>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="line-clamp"
                            style={{ textDecorationLine: 'underline' }}
                          >
                            {item.url}
                          </a>
                        </td>
                        <td>{moment(item.start_date).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.end_date).format('DD/MM/YYYY')}</td>
                        <td>
                          {item.active ? (
                            <TextAlert
                              text="Aktif"
                              type="success"
                              className="nowrap"
                            />
                          ) : (
                            <TextAlert
                              text="Tidak Aktif"
                              type="danger"
                              className="nowrap"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="float-md-right">
            <DataTablePagination
              page={currentPage - 1}
              pages={totalPage}
              canNext={currentPage < totalPage}
              canPrevious={currentPage > 1}
              onPageChange={(page) => setCurrentPage(page + 1)}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SlidePage
