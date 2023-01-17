import IdrFormat from 'helpers/IdrFormat'
import './index.scss'

const UserCard = ({ judul, jumlah }) => {
  return (
    <div className="card user-card">
      <div className="d-block content">
        <p className="title">{judul}</p>
        <h3 className="text-danger jumlah">{IdrFormat(jumlah)}</h3>
      </div>
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path
            stroke="#717171"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 16a6.667 6.667 0 100-13.333A6.667 6.667 0 0016 16zM27.453 29.333C27.453 24.173 22.32 20 16 20c-6.32 0-11.453 4.173-11.453 9.333"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default UserCard
