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

const pageSizes = [4, 8, 12, 20]

const dummySlideData = [
  {
    id: 0,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Pariatur ea excepteur labore laborum enim consectetur.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 1,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Adipisicing esse deserunt velit ad occaecat tempor ut minim eiusmod excepteur cillum tempor.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 2,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Laboris ex anim culpa qui velit esse ullamco.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 3,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Exercitation ea aute sint eiusmod minim veniam anim proident.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 4,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Lorem sint nostrud commodo consectetur ad est do.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 5,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Sunt mollit aliquip minim velit nisi exercitation eu ipsum labore aliquip sunt enim nulla.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 6,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Est nulla et sit irure.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 7,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Do amet minim tempor quis officia incididunt ad commodo nulla sunt in.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 8,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Officia ullamco ad incididunt esse adipisicing fugiat eu consequat.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 9,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Dolor eiusmod mollit velit enim incididunt velit.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 10,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Fugiat anim elit ullamco laborum culpa nulla ullamco magna velit fugiat fugiat sit Lorem exercitation.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 11,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Minim aliquip anim enim laborum qui.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 12,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Est anim commodo laboris laborum culpa velit dolore.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 13,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Aliquip officia velit commodo id labore dolore minim Lorem.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 14,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Exercitation ad laboris exercitation ex enim cillum aute aliquip.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 15,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Magna veniam cillum sint cillum ipsum esse in.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 16,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Ex culpa voluptate sunt quis consectetur et.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 17,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul: 'Ex ea non veniam do laboris adipisicing officia ad est ipsum.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: true,
  },
  {
    id: 18,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Culpa sit adipisicing et deserunt cillum dolore non ullamco officia.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
  {
    id: 19,
    image: 'https://peduly.com/images/images_carousel/slide-1.png',
    judul:
      'Voluptate sunt duis tempor anim veniam do pariatur magna tempor esse sit dolor laboris.',
    directLink: 'https://peduly.com/donasi-sekali/edukasianakpanti',
    start: '2016-10-26T08:14:04-07:00',
    end: '2016-10-26T08:14:04-07:00',
    status: false,
  },
]

const initialData = dummySlideData.sort((a, b) => {
  return b.id - a.id
})

const SlidePage = () => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [data] = useState(initialData)
  const [search] = useState('')
  const history = useHistory()

  useEffect(() => {
    setTotalPage(Math.ceil(data.length / currentPageSize))
  }, [currentPageSize, data])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

  return (
    <>
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
            <span className="text-muted text-small mr-1">{`1 of 1 `}</span>
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
            <CardBody style={{ padding: '24px' }}>
              <Table className="table-slide" hover responsive>
                <thead>
                  <tr className="nowrap">
                    <th style={{ borderTop: '0px' }}>#</th>
                    <th style={{ borderTop: '0px' }}>Gambar Slide</th>
                    <th style={{ borderTop: '0px' }}>Judul</th>
                    <th style={{ borderTop: '0px' }}>Direct Link</th>
                    <th style={{ borderTop: '0px' }}>Tanggal Mulai</th>
                    <th style={{ borderTop: '0px' }}>Tanggal Berakhir</th>
                    <th style={{ borderTop: '0px', maxWidth: '200px' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((tr) => tr.judul.toLowerCase().includes(search))
                    .slice(
                      (currentPage - 1) * currentPageSize,
                      currentPage * currentPageSize
                    )
                    .map((item) => (
                      <tr
                        key={item.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          history.push(`/app/slide/edit/${item.id}`)
                        }
                      >
                        <td>{item.id}</td>
                        <td>
                          <div className="slide-image-container">
                            <img
                              src={item.image}
                              alt={item.judul}
                              className="slide-image"
                            />
                          </div>
                        </td>
                        <td>
                          <p className="line-clamp">{item.judul}</p>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="line-clamp"
                            style={{ 'text-decoration-line': 'underline' }}
                          >
                            {item.directLink}
                          </a>
                        </td>
                        <td>{moment(item.start).format('DD/MM/YYYY')}</td>
                        <td>{moment(item.end).format('DD/MM/YYYY')}</td>
                        <td>
                          {item.status ? (
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
    </>
  )
}

export default SlidePage
