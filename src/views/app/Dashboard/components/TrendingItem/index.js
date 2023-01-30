/* eslint-disable no-unused-vars */

import { API_URL, IMAGE_CONTEXT } from 'config/api'
import IdrFormat from 'helpers/IdrFormat'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Progress } from 'reactstrap'

import './index.scss'

const TrendingItem = ({ item }) => {
  return (
    <Link
      to={{
        pathname: `/app/halaman-galang-dana/detail/${item.judul_slug}`,
      }}
      className="trending-item"
    >
      <div className="trending-item-container">
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
          <p className="line-clamp-2 text-left judul">{item.judul_campaign}</p>
          <Progress
            value={Math.min(
              Math.max((item.total_donasi / item.nominal_campaign) * 100, 0),
              100
            )}
          />
          <div className="info-container">
            <div className="info-item">
              <p className="title line-clamp">Target</p>
              <p className="nominal line-clamp">
                Rp{item.total_donasi ? IdrFormat(item.total_donasi) : ''}
              </p>
            </div>
            <div className="info-item">
              <p className="title line-clamp">Terkumpul</p>
              <p className="nominal line-clamp">
                Rp
                {item.nominal_campaign ? IdrFormat(item.nominal_campaign) : ''}
              </p>
            </div>
            <div className="info-item">
              <p className="title line-clamp">Sisa Hari</p>
              <p className="nominal line-clamp">
                {item.batas_waktu_campaign
                  ? moment(item.batas_waktu_campaign, 'YYYY-MM-DD').diff(
                      moment(),
                      'days'
                    )
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TrendingItem
