import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import MiniCard from './components/RingkasanGalangDana/MiniCard'
import TrendingGalangDana from './components/RingkasanGalangDana/TrendingGalangDana'
import UserCard from './components/RingkasanPengguna/UserCard'
import PayCard from './components/RingkasanPengguna/PayCard'
import ListUserCard from './components/RingkasanPengguna/ListUserCard'
import GrafikTotalDonasi from './components/RingkasanGalangDana/GrafikTotalDonasi'
import { barChartData } from 'data/charts'

import './index.scss'
import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'
import moment from 'moment'
import GrafikKategoriGalangDana from './components/GrafikKategoriGalangDana'
import { CategoryGalangDana } from 'data/category-galang-dana'
import GrafikTotalGalangDana from './components/GrafikTotalGalangDana'
// import BarSingle from 'components/charts/BarSingle'

/* eslint-disable no-unused-vars */
const Dashboard = () => {
  // { match }
  const [listUser, setListUser] = useState([])
  const [listGalangDana, setListGalangDana] = useState([])
  const [listCategoryGalangData] = useState(CategoryGalangDana)
  const maxTrendingItem = 5

  useEffect(() => {
    getGalangDana()
    getUser()
  }, [])

  const getGalangDana = () => {
    http
      .get(API_ENDPOINT.GET_LIST_GALANG_DANA)
      .then((res) => {
        setListGalangDana(res.data.data)
      })
      .catch((err) => {
        console.log('Error get galang dana data: ', err)
      })
  }

  const getUser = () => {
    http
      .get(API_ENDPOINT.GET_ALL_USER)
      .then((res) => {
        setListUser(res.data.data)
      })
      .catch((err) => {
        console.log('Error get user data: ', err)
      })
  }

  const galangDanaActive = listGalangDana?.filter((data) => {
    return moment(data.batas_waktu_campaign, 'YYYY-MM-DD').isAfter(moment())
  })

  const galangDanaNonActive = listGalangDana?.filter((data) => {
    return !moment(data.batas_waktu_campaign, 'YYYY-MM-DD').isAfter(moment())
  })

  const trendingGalangDana = galangDanaActive
    ?.sort((a, b) => {
      const trendingMultiplier = (dateCreated, donatur) => {
        const daysToGo = moment(dateCreated).diff(moment(), 'days')

        return parseInt(donatur) / Math.abs(daysToGo)
      }
      return (
        trendingMultiplier(b.created_at, b.donations_count) -
        trendingMultiplier(a.created_at, a.donations_count)
      )
    })
    .slice(0, maxTrendingItem)

  const filterNewUser = listUser
    ?.filter((data) => {
      // filter user with role user
      return data.role === 'User'
    })
    .filter((user) => {
      const dayAgo = moment().subtract(30, 'days')
      return moment(user.tanggal_dibuat, 'DD/MM/YYYY HH:mm').isSameOrAfter(
        dayAgo
      )
    })

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Row>
        <Col>
          <h1>Ringkasan Galang Dana</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="top-mini-card">
            <Col>
              <MiniCard judul="Aktif" text={galangDanaActive?.length} />
            </Col>
            <Col>
              <MiniCard
                judul="Tidak Aktif"
                text={galangDanaNonActive?.length}
              />
            </Col>
            <Col>
              <MiniCard judul="Total" text={listGalangDana?.length} />
            </Col>
          </Row>
          <Row className="bottom-mini-card">
            <Col xxs="12">
              <GrafikTotalDonasi barChartData={barChartData} />
            </Col>
          </Row>
        </Col>
        <Col className="mb-4">
          <TrendingGalangDana TrendingGalangDanaData={trendingGalangDana} />
        </Col>
      </Row>
      <Row>
        <Col>
          <GrafikTotalGalangDana galangDanaData={listGalangDana} />
        </Col>
        <Col>
          <GrafikKategoriGalangDana categoryData={listCategoryGalangData} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xxs="12">
          <h1>Ringkasan Pengguna</h1>
        </Col>
      </Row>
      <Row style={{ marginBottom: '30px' }}>
        <Col xss="3">
          <UserCard judul="Jumlah Pengguna" jumlah={listUser.length} />
        </Col>
        <Col xss="3">
          <UserCard judul="Pengguna Baru" jumlah={filterNewUser.length} />
        </Col>
        <Col xss="3">
          <PayCard judul="Biaya Operasional" jumlah="23300000" />
        </Col>
        <Col xss="3">
          <PayCard judul="Total Payable" jumlah="100300000" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card" style={{ height: '401px' }}></div>
        </Col>
        <Col>
          <div className="card" style={{ height: '401px' }}></div>
        </Col>
        <Col>
          <ListUserCard ListUser={filterNewUser} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
