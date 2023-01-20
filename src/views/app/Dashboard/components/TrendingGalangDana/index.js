/* eslint-disable no-unused-vars */

import React from 'react'
import PerfectScrollBar from 'react-perfect-scrollbar'

import './index.scss'
import TrendingItem from '../TrendingItem'

const TrendingGalangDana = ({ TrendingGalangDanaData }) => {
  return (
    <div className="card trending-card">
      <h3 className="card-title">Trending Galang Dana</h3>
      <PerfectScrollBar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="trending-container">
          {TrendingGalangDanaData?.map((item, index) => (
            <TrendingItem key={`trending-${index}`} item={item} />
          ))}
        </div>
      </PerfectScrollBar>
    </div>
  )
}

export default TrendingGalangDana
