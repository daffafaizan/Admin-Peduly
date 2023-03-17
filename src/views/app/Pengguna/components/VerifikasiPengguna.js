import React from 'react'
// import { useState, useEffect } from 'react'
import {
  Col,
  Label,
  FormGroup,
} from 'reactstrap'

const VerifikasiPengguna = () => {
  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <div className="col-4">
        <FormGroup>
          <Label for="namalengkap" lg={12} className="detail-pengguna-label mb-1">
            Nama Bank
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">Bank Central Asia</p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label for="noRekening" lg={12} className="detail-pengguna-label mb-1">
            no. rekening
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"> </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label for="tanggalLahir" lg={12} className="detail-pengguna-label mb-1">
            Nominal Donasi
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">Rp </p>
          </Col>
        </FormGroup>
      </div>
    </div>
  )
}

export default VerifikasiPengguna