import { useEffect, useState } from 'react'
import {
  Row,
  Card,
  CardBody,
  Table,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import './index.scss'
import IdrFormat from 'helpers/IdrFormat'
// import moment from 'moment'
import DataTablePagination from 'components/DatatablePagination'
// import TextAlert from 'components/TextAlert'
import { useHistory, useParams, NavLink } from 'react-router-dom'
import { getCurrentColor } from 'helpers/Utils'
// import http from 'helpers/http'
// import { API_ENDPOINT } from 'config/api'

const pageSizes = [20, 40, 80]

const DetailFundraiser = () => {
  const [data, setData] = useState([])
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { id } = useParams()

  const history = useHistory()
  const color = getCurrentColor()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    getCurrentColor()
    getFundraiserData()
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(data.length / currentPageSize))
  }, [currentPageSize, data])

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getFundraiserData = () => {
    const dummyData = [
      {
        number: 1,
        nama: 'Firda Yuningsih',
        kode: 'PDLY9832',
        galangDana: 15000000,
        komisi: 2250000,
        lokasi: 'Kota Surabaya',
        bergabung: '13/05/2023',
      },
    ]

    setData(dummyData)
  }

  const konversiToNumber = (angka) => {
    const idrFormat = IdrFormat(parseInt(angka))
    if (!isNaN(idrFormat)) {
      return idrFormat
    } else {
      return 0
    }
  }

  function filteredData() {
    let s

    s = data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return s
  }

  return (
    <div className="detail-fundraiser-page">
      <Row>
        <Colxx xxs="12">
          <Row>
            <div
              className="svg-container ml-3"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink to={"/app/fundraiser"}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57 5.93018L3.5 12.0002L9.57 18.0702"
                    stroke={isHovered ? '#FF0000' : '#3A3A3A'}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12H3.66992"
                    stroke={isHovered ? '#FF0000' : '#3A3A3A'}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </div>
            <h1>Firda Yuningsih {id}</h1>
          </Row>
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
                    <th style={{ borderTop: '0px' }}>#</th>
                    <th style={{ borderTop: '0px' }}>Nama</th>
                    <th style={{ borderTop: '0px' }}>Kode Referal</th>
                    <th style={{ borderTop: '0px' }}>Galang Dana</th>
                    <th style={{ borderTop: '0px' }}>Komisi</th>
                    <th style={{ borderTop: '0px' }}>Lokasi</th>
                    <th style={{ borderTop: '0px' }}>Bergabung</th>
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
                            history.push(``)
                          }
                        >
                          <td>
                            {(currentPage - 1) * currentPageSize + index + 1}
                          </td>
                          <td>{item.nama}</td>
                          <td>
                            <p>{item.kode}</p>
                          </td>
                          <td>Rp {konversiToNumber(item.galangDana)}</td>
                          <td>Rp {konversiToNumber(item.komisi)}</td>
                          <td>{item.lokasi}</td>
                          <td>{item.bergabung}</td>
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

export default DetailFundraiser
