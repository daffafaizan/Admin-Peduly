import { Col, Label, FormGroup } from 'reactstrap'

const RekeningPengguna = () => {
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
            <p className="detail-transaksi-text">Zaki Lazuardi</p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label for="email" lg={12} className="detail-transaksi-label mb-1">
            Email
          </Label>
          <Col lg={12}>
            <p className="detail-transaksi-text"> </p>
          </Col>
        </FormGroup>

        <FormGroup>
          <Label
            for="tanggalLahir"
            lg={12}
            className="detail-transaksi-label mb-1"
          >
            Nominal Donasi
          </Label>
          <Col lg={12}>
            <p className="detail-transaksi-text">Rp </p>
          </Col>
        </FormGroup>
      </div>
    </div>
  )
}

export default RekeningPengguna
