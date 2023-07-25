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
import { useHistory } from 'react-router-dom'
import { getCurrentColor } from 'helpers/Utils'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'

const pageSizes = [20, 40, 80]

const Fundraiser = () => {
  const [dataSemuaFundraiser, setDataSemuaFundraiser] = useState([])
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const history = useHistory()
  const color = getCurrentColor()

  useEffect(() => {
    getCurrentColor()
    getSemuaFundraiserData()
  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(dataSemuaFundraiser.length / currentPageSize))
  }, [currentPageSize, dataSemuaFundraiser])

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage(1)
  }, [totalPage, currentPage])

  const getSemuaFundraiserData = () => {
    http
      .get(`${API_ENDPOINT.GET_LIST_FUNDRAISER}`)
      .then((res) => {
        console.log(res.data)
        const responseData = res.data
        setDataSemuaFundraiser(responseData)
      })
      .catch((err) => {
        console.error('Error: ', err)
      })
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

    s = dataSemuaFundraiser.sort((a, b) => {
      return new Date(b.joinAt) - new Date(a.joinAt)
    })

    return s
  }

  return (
    <div className="fundraiser-page">
      <Row>
        <Colxx xxs="12">
          <h1>Semua Fundraiser</h1>
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
                className={`${
                  !color.indexOf('dark') ? 'table-dark-mode' : ''
                } center-text-table`}
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
                          style={{ cursor: 'pointer', height: '60px' }}
                          onClick={() =>
                            history.push(`/app/fundraiser/detail/${item.id}`)
                          }
                        >
                          <td>
                            {(currentPage - 1) * currentPageSize + index + 1}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.kode_referal}</td>
                          <td>Rp{konversiToNumber(item.galangdana)}</td>
                          <td>Rp{konversiToNumber(item.komisi)}</td>
                          <td>{item.kabupaten}</td>
                          <td>{item.joinAt}</td>
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

export default Fundraiser
