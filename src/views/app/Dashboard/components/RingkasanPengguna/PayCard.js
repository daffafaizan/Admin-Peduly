import IdrFormat from 'helpers/IdrFormat'
import './index.scss'

const PayCard = ({ judul, jumlah }) => {
  return (
    <div className="card pay-card d-block">
      <p className="title">{judul}</p>
      <h3 className="text-danger jumlah">Rp {IdrFormat(jumlah)}</h3>
    </div>
  )
}

export default PayCard
