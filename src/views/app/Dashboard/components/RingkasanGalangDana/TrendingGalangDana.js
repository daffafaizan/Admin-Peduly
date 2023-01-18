import React from 'react'
import dayToGo from 'helpers/DayToGo'
import IdrFormat from 'helpers/IdrFormat'
import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import PerfectScrollBar from 'react-perfect-scrollbar'

import './index.scss'

const TrendingGalangDana = ({ TrendingGalangDanaData }) => {
  return (
    <div className="card trending-card">
      <h1 className="card-title">Trending Galang Dana</h1>
      <PerfectScrollBar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        {TrendingGalangDanaData.map((item, index) => (
          <div key={`trending-${index}`}>
            <Link
              to={{
                pathname: `/donasi-sekali/${item.slug}`,
              }}
            >
              <div className="card-container">
                <div className="container-foto">
                  <img
                    src={`images/images_campaign/${item.foto_campaign}`}
                    alt=""
                    className="foto-campaign"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/assets/img/no-picture.png'
                    }}
                  />
                </div>
                <div className="container-detail">
                  <p className="line-clamp-2 text-left judul">
                    {item.judul_campaign}
                  </p>
                  <div className="rounded progress">
                    <ProgressBar
                      current={item.total_donasi || item.current_donasi}
                      target={
                        item
                          ? item.nominal_campaign || item.nominal_campaign
                          : 0
                      }
                      waktu={item.batas_waktu_campaign}
                    />
                  </div>
                  <div className="container-info">
                    <div className="container-dana">
                      <p className="target">Target</p>
                      <p className="nominal">
                        Rp {IdrFormat(item.nominal_campaign)}
                      </p>
                    </div>
                    <div className="container-dana">
                      <p className="target">Terkumpul</p>
                      <p className="nominal">
                        Rp {IdrFormat(item.current_donasi)}
                      </p>
                    </div>
                    <div className="container-waktu">
                      <p className="judul">Sisa Hari</p>
                      <p className="nominal">
                        {dayToGo(item.batas_waktu_campaign)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </PerfectScrollBar>
    </div>
  )
}

export default TrendingGalangDana
