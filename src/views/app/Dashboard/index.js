import React from 'react'
import { Row } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
import MiniCard from './components/RingkasanGalangDana/MiniCard'
import TrendingGalangDana from './components/RingkasanGalangDana/TrendingGalangDana'
import GrafikGalangDana from './components/RingkasanGalangDana/GrafikGalangDana'
import UserCard from './components/RingkasanPengguna/UserCard'
import PayCard from './components/RingkasanPengguna/PayCard'
import ListUserCard from './components/RingkasanPengguna/ListUserCard'
import { BarChart } from 'components/charts'
import { barChartData } from 'data/charts'

import './index.scss'

const TrendingGalangDanaData = [
  {
    id: 1,
    slug: 'rumahzakat',
    judul_campaign: 'Rumah Zakat',
    foto_campaign: '',
    total_donasi: 9000000,
    current_donasi: 9000000,
    nominal_campaign: 10200654,
    batas_waktu_campaign: '2023-02-28T07:23:22.000000Z',
  },
  {
    id: 1,
    slug: 'rumahzakat',
    judul_campaign: 'Rumah Zakat',
    foto_campaign: '',
    total_donasi: 9000000,
    current_donasi: 9000000,
    nominal_campaign: 10200654,
    batas_waktu_campaign: '2023-02-28T07:23:22.000000Z',
  },
  {
    id: 1,
    slug: 'yayasanmuamalatindonesia',
    judul_campaign: 'Yayasan Muamalat Indonesia',
    foto_campaign: '',
    total_donasi: 9000000,
    current_donasi: 9000000,
    nominal_campaign: 10200654,
    batas_waktu_campaign: '2023-06-28T07:23:22.000000Z',
  },
  {
    id: 1,
    slug: 'dompetduafa',
    judul_campaign: 'Dompet Duafa',
    foto_campaign: '',
    total_donasi: 9000000,
    current_donasi: 9000000,
    nominal_campaign: 10200654,
    batas_waktu_campaign: '2022-06-28T07:23:22.000000Z',
  },
]

const ListUser = [
  {
    id: 1,
    username: 'Melinda Gates',
    created_at: '2023-01-16T07:23:22.000000Z',
  },
  {
    id: 1,
    username: 'Muhammad Naufal',
    created_at: '2023-01-05T07:23:22.000000Z',
  },
  {
    id: 1,
    username: 'Muhammad Zaki',
    created_at: '2023-01-02T07:23:22.000000Z',
  },
  {
    id: 1,
    username: 'Muhammad dani',
    created_at: '2023-01-01T07:23:22.000000Z',
  },
  {
    id: 1,
    username: 'Muhammad dani',
    created_at: '2023-01-01T07:23:22.000000Z',
  },
  {
    id: 1,
    username: 'Muhammad dani',
    created_at: '2023-01-01T07:23:22.000000Z',
  },
]

const barChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Cakes',
      borderColor: '#922c88',
      backgroundColor: 'rgba(146, 44, 136, .1)',
      data: [456, 479, 324, 569, 702, 600],
      borderWidth: 2,
    },
    {
      label: 'Desserts',
      borderColor: '#4556ac',
      backgroundColor: 'rgba(69, 86, 172, .1)',
      data: [364, 504, 605, 400, 345, 320],
      borderWidth: 2,
    },
  ],
}

const Dashboard = () => (
  // { match }
  <div style={{ paddingBottom: '20px' }}>
    <Row>
      <Colxx xxs="12">
        <h1>Ringkasan Galang Dana</h1>
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="6">
        <Row className="top-mini-card">
          <Colxx xxs="4">
            <MiniCard judul="Aktif" text="40" />
          </Colxx>
          <Colxx xxs="4">
            <MiniCard judul="Tidak Aktif" text="680" />
          </Colxx>
          <Colxx xxs="4">
            <MiniCard judul="Total" text="720" />
          </Colxx>
        </Row>
        <Row className="bottom-mini-card">
          <Colxx xxs="12">
            <GrafikGalangDana barChartData={barChartData} />
          </Colxx>
        </Row>
      </Colxx>
      <Colxx xxs="6" className="mb-4">
        <TrendingGalangDana TrendingGalangDanaData={TrendingGalangDanaData} />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12">
        <div className="card grafik-kategori">
          <h1 className="card-title">Grafik Kategori Galang Dana</h1>
          <Row>
            <Colxx xxs="6">
              <div className="chart-container">
                <BarChart shadow data={barChartData2} />
              </div>
            </Colxx>
            <Colxx xxs="6">
              <div className="chart-container">
                <BarChart shadow data={barChartData2} />
              </div>
            </Colxx>
          </Row>
        </div>
      </Colxx>
    </Row>
    <hr />
    <Row>
      <Colxx xxs="12">
        <h1>Ringkasan Pengguna</h1>
      </Colxx>
    </Row>
    <Row style={{ marginBottom: '30px' }}>
      <Colxx xss="3">
        <UserCard judul="Jumlah Pengguna" jumlah="120324" />
      </Colxx>
      <Colxx xss="3">
        <UserCard judul="Pengguna Baru" jumlah="25" />
      </Colxx>
      <Colxx xss="3">
        <PayCard judul="Biaya Operasional" jumlah="23300000" />
      </Colxx>
      <Colxx xss="3">
        <PayCard judul="Total Payable" jumlah="100300000" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="4">
        <div className="card" style={{ height: '401px' }}></div>
      </Colxx>
      <Colxx xxs="4">
        <div className="card" style={{ height: '401px' }}></div>
      </Colxx>
      <Colxx xxs="4">
        <ListUserCard ListUser={ListUser} />
      </Colxx>
    </Row>
  </div>
)
export default Dashboard
