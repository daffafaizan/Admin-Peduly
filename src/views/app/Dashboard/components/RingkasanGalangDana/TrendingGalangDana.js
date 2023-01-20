import React from 'react'
import IdrFormat from 'helpers/IdrFormat'
import { Link } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import PerfectScrollBar from 'react-perfect-scrollbar'

import './index.scss'
import moment from 'moment'
import { API_URL, IMAGE_CONTEXT } from 'config/api'

const TrendingGalangDana = ({ TrendingGalangDanaData }) => {
  return (
    <div className="card trending-card">
      <h3 className="card-title">Trending Galang Dana</h3>
      <PerfectScrollBar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <>
          {TrendingGalangDanaData?.map((item, index) => (
            <div key={`trending-${index}`}>
              <Link
                to={{
                  pathname: `/donasi-sekali/${item.slug}`,
                }}
              >
                <div className="card-container">
                  <div className="container-foto">
                    <img
                      src={`${API_URL}/${IMAGE_CONTEXT}/${item.foto_campaign}`}
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
                          Rp{' '}
                          {item.total_donasi
                            ? IdrFormat(item.total_donasi)
                            : ''}
                        </p>
                      </div>
                      <div className="container-dana">
                        <p className="target">Terkumpul</p>
                        <p className="nominal">
                          Rp{' '}
                          {item.nominal_campaign
                            ? IdrFormat(item.nominal_campaign)
                            : ''}
                        </p>
                      </div>
                      <div className="container-waktu">
                        <p className="judul">Sisa Hari</p>
                        <p className="nominal">
                          {item.batas_waktu_campaign
                            ? moment(
                                item.batas_waktu_campaign,
                                'YYYY-MM-DD'
                              ).diff(moment(), 'days')
                            : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      </PerfectScrollBar>
    </div>
  )
}

export default TrendingGalangDana
