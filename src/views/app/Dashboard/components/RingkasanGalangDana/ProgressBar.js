import dayToGo from 'helpers/DayToGo'
import './index.scss'

const ProgressBar = ({ target, current, waktu }) => {
  let percent = (current / target) * 100

  return (
    <div className="rounded progress-container">
      <div
        className={`rounded progress-bar ${
          dayToGo(waktu) !== 'berakhir' ? 'active' : 'expired'
        }`}
        style={{ width: `${percent}%`, maxWidth: '100%' }}
      ></div>
    </div>
  )
}

export default ProgressBar
