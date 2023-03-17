/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import { Row, Card } from 'reactstrap'
import { Colxx } from 'components/common/CustomBootstrap'
// import { useParams } from 'react-router-dom'
import './index.scss'
import DataPengguna from './components/DataPengguna'
import VerifikasiPengguna from './components/VerifikasiPengguna'
import RekeningPengguna from './components/RekeningPengguna'

const DetailPengguna = () => {
  // const { id } = useParams()
  const [mode, setMode] = useState("detail")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <div className="d-flex" style={{ marginBottom: '38px' }}>
        <div className="d-flex w-full judul-container flex-column flex-md-row flex-wrap">
          <h1
            className="judul mb-2 mb-md-0"
          >
            Detail Pengguna
          </h1>

        </div>
      </div>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4 p-0 flex-lg-row flex-md-column mr-0" style={{ borderRadius: '15px', margin: 0 }}>
            <Row className="sidebar-pengguna col-lg-2 col-md-12">
              <div className="sidebar-menu-pengguna">
                <span className={`${mode === 'detail' ? 'button-menu-pengguna-active' : 'button-menu-pengguna'}`}
                  onClick={() => { setMode('detail') }}>Detail</span>
                <span className={`${mode === 'verifikasi' ? 'button-menu-pengguna-active' : 'button-menu-pengguna'}`} onClick={() => { setMode('verifikasi') }}>Verifikasi</span>
                <span className={`${mode === 'rekening' ? 'button-menu-pengguna-active' : 'button-menu-pengguna'}`} onClick={() => { setMode('rekening') }}>Rekening</span>
              </div>
            </Row>
            {mode === 'detail' && (<DataPengguna />)}
            {mode === 'verifikasi' && (<VerifikasiPengguna />)}
            {mode === 'rekening' && (<RekeningPengguna />)}
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default DetailPengguna