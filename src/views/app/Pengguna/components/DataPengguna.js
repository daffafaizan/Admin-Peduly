import { Col, Label, FormGroup } from 'reactstrap'

const DataPengguna = () => {
  return (
    <div className="d-flex m-4">
      {/* col 1 */}
      <div className="col-4">
        <FormGroup>
          <Label
            for="namalengkap"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Nama Lengkap
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"> </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label for="email" lg={12} className="detail-pengguna-label mb-1">
            Email
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"> </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="tanggalLahir"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Nominal Donasi
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">Rp </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="nominalDonasi"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Total Donasi
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">Rp </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="nominalDonasi"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Tujuan Donasi
          </Label>
          <Col lg={12}>
            <a href="" className="detail-pengguna-text">
              Bantu panti asuhan
            </a>
          </Col>
        </FormGroup>
      </div>

      {/* col 2 */}
      <div className="col-4">
        <FormGroup>
          <Label
            for="idpengguna"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            ID pengguna
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"></p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="metodePembayaran"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Pembuatan Invoice
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"></p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="nominalDonasi"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Biaya Payment Gateway
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">-Rp </p>
          </Col>
        </FormGroup>
      </div>
      {/* col 3 */}
      <div className="col-4">
        <FormGroup>
          <Label for="status" lg={12} className="detail-pengguna-label mb-1">
            Status
          </Label>
          <Col lg={12}></Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="metodePembayaran"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Pembayaran Invoice
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text"></p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="nominalDonasi"
            lg={12}
            className="detail-pengguna-label mb-1"
          >
            Biaya Administrasi
          </Label>
          <Col lg={12}>
            <p className="detail-pengguna-text">-Rp </p>
          </Col>
        </FormGroup>
      </div>
    </div>
  )
}

export default DataPengguna
