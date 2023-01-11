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
import useMousetrap from 'hooks/use-mousetrap'
import './index.scss'
import moment from 'moment'

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
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPageSize, setCurrentPageSize] = useState(pageSizes[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [data] = useState(initialData)
  const [search] = useState('')

  useEffect(() => {
    setTotalPage(Math.ceil(data.length / currentPageSize))
  }, [currentPageSize, data])

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1)
    }
  }, [totalPage, currentPage])

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= initialData.length) {
      if (isToggle) {
        setSelectedItems([])
      }
    } else {
      setSelectedItems(initialData.map((x) => x.id))
    }
    document.activeElement.blur()
    return false
  }

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false)
  })

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([])
    return false
  })

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Semua Slide</h1>
          <Button className="float-md-right">Buat Slide Baru</Button>
          <Separator />
        </Colxx>
      </Row>
      <Row style={{ margin: '12px 0' }}>
        <Col style={{ padding: 0 }}>
          <div className="float-md-right">
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
              <Table hover responsive>
                <thead>
                  <tr>
                    <th style={{ borderTop: '0px', width: '5%' }}>#</th>
                    <th style={{ borderTop: '0px', width: '15%' }}>
                      Gambar Slide
                    </th>
                    <th style={{ borderTop: '0px', width: '15%' }}>Judul</th>
                    <th style={{ borderTop: '0px', width: '20%' }}>
                      Direct Link
                    </th>
                    <th style={{ borderTop: '0px', width: '10%' }}>
                      Tanggal Mulai
                    </th>
                    <th style={{ borderTop: '0px', width: '10%' }}>
                      Tanggal Berakhir
                    </th>
                    <th style={{ borderTop: '0px', width: '10%' }}>Status</th>
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
                      <tr key={item.id} style={{ cursor: 'pointer' }}>
                        <td>{item.id}</td>
                        <td
                          style={{
                            maxWidth: '300px',
                          }}
                        >
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
                            <TextAlert text="Aktif" type="success" />
                          ) : (
                            <TextAlert text="Tidak Aktif" type="danger" />
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
    </>
  )
}

const TextAlert = ({ text, type = 'success', className }) => {
  const styles = {
    success: {
      background: 'rgba(52, 168, 83, 0.2)',
      padding: '3px 12px',
      margin: '0px',
      width: 'fit-content',
    },
    danger: {
      background: 'rgba(231, 81, 59, 0.2)',
      padding: '3px 12px',
      margin: '0px',
      width: 'fit-content',
    },
  }

  const textStyles = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }

  return (
    <p
      className={`${textStyles[type]} rounded text-center ${className}`}
      style={styles[type]}
    >
      {text}
    </p>
  )
}

export default SlidePage
