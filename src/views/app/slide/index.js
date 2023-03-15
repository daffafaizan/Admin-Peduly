import { useEffect, useState } from 'react'
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
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'

const pageSizes = [20, 40, 80]

const SlidePage = () => {
  const [data, setData] = useState([])
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const history = useHistory()
  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getSlidesData()
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(data.length / currentPageSize))
  }, [currentPageSize, data])

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getSlidesData = () => {
    http
      .get(API_ENDPOINT.GET_DATA_SLIDES)
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
  }

  function filteredData() {
    let s

    s = data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return s
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
        <Colxx xs="12" className="mb-4">
          <Card className="mb-4 card-rounded">
            <CardBody className="card-body">
              <Table
                hover
                responsive
                className={`${!color.indexOf('dark') ? 'table-dark-mode' : ''}`}
              >
                <thead>
                  <tr className="nowrap">
                    <th>#</th>
                    <th>Gambar Slide</th>
                    <th>Judul</th>
                    <th>Direct Link</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
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
                                style={{
                                  objectFit: 'cover',
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <p>{item.title}</p>
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
                          <td>
                            {moment(item.start_date).format('DD/MM/YYYY')}
                          </td>
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
    </div>
  )
}

export default SlidePage
