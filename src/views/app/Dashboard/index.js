/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import MiniCard from '../../../components/MiniCard'
import ListUserCard from './components/RingkasanPengguna/ListUserCard'
import GrafikTotalDonasi from './components/RingkasanGalangDana/GrafikTotalDonasi'

import http from 'helpers/http'
import { API_ENDPOINT } from 'config/api'
import moment from 'moment'
import GrafikKategoriGalangDana from './components/GrafikKategoriGalangDana'
import { CategoryGalangDana } from 'data/category-galang-dana'
import GrafikTotalGalangDana from './components/GrafikTotalGalangDana'
import MiniCard2 from '../../../components/MiniCard2'
import TrendingGalangDana from './components/TrendingGalangDana'
import UserRedIcon from 'assets/icons/UserRedIcon'
import UserGreenIcon from 'assets/icons/UserGreenIcon'

const Dashboard = () => {
  // { match }
  const [listUser, setListUser] = useState([])
  const [listGalangDana, setListGalangDana] = useState([])
  const [listCategoryGalangData] = useState(CategoryGalangDana)
  const [listGalangDanaPerCategory, setListGalangDanaPerCategory] = useState([])
  const [listTransaksi, setListTransaksi] = useState([])
  const maxTrendingItem = 5

  useEffect(() => {
    getGalangDana()
    getUser()
    getTransaksiDonasiData()
    initGalangDanaByCategory()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initGalangDanaByCategory = async () => {
    const datas = await Promise.all(
      listCategoryGalangData?.map(async (item) => {
        const res = await getGalangDanaByCategory(item.title)

        return {
          category: item.title,
          data: res.data.data,
        }
      })
    )

    setListGalangDanaPerCategory(datas)
  }

  const getGalangDanaByCategory = async (category) => {
    try {
      const res = await http.get(API_ENDPOINT.GET_LIST_GALANG_DANA, {
        params: { kategori: category },
      })

      return res
    } catch (error) {
      console.log('Error get galang dana by category: ', error)
    }
  }

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

  const getTransaksiDonasiData = () => {
    http
      .get(API_ENDPOINT.GET_ALL_TRANSAKSI)
      .then((res) => {
        setListTransaksi(res.data)
      })
      .catch((err) => {
        console.log('Error get transaksi data: ', err)
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
    <div className="dashboard" style={{ paddingBottom: '20px' }}>
      <Row>
        <Col>
          <h1>Ringkasan Galang Dana</h1>
        </Col>
      </Row>
      <Row className="section-1-container mb-4">
        <Col>
          <div className="section-1-left">
            <div className="top-mini-card">
              <MiniCard judul="Aktif" text={galangDanaActive?.length} />
              <MiniCard
                judul="Tidak Aktif"
                text={galangDanaNonActive?.length}
              />
              <MiniCard judul="Total" text={listGalangDana?.length} />
            </div>
            <div className="bottom-mini-card">
              <GrafikTotalDonasi donasiData={listTransaksi} />
            </div>
          </div>
        </Col>
        <Col>
          <TrendingGalangDana TrendingGalangDanaData={trendingGalangDana} />
        </Col>
      </Row>
      <Row className="section-2-container">
        <Col>
          <GrafikTotalGalangDana galangDanaData={listGalangDana} />
        </Col>
        <Col>
          <GrafikKategoriGalangDana datas={listGalangDanaPerCategory} />
        </Col>
      </Row>
      <Row className="section-3-container">
        <Col>
          <MiniCard2 title="Dana Terkumpul" text={`Rp 11.000.000`} />
        </Col>
        <Col>
          <MiniCard2 title="Biaya Iklan" text={`Rp 11.000.000`} />
        </Col>
        <Col>
          <MiniCard2 title="Biaya Operasional" text={`Rp 11.000.000`} />
        </Col>
        <Col>
          <MiniCard2 title="Total Payable" text={`Rp 10.000.000`} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h1>Ringkasan Pengguna</h1>
        </Col>
      </Row>
      <Row className="section-4-container">
        <Col className="section-1">
          <MiniCard2
            title="Jumlah Pengguna"
            text={listUser.length}
            icon={<UserRedIcon />}
          />
          <MiniCard2
            title="Pengguna Baru"
            subtitle={'7 Hari Terakhir'}
            text={filterNewUser.length}
            icon={<UserGreenIcon />}
          />
        </Col>
        <Col>
          <ListUserCard ListUser={filterNewUser} />
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  )
}

export default Dashboard
