import DataLogic from './dataLogic'
import './ticket-data.scss'

const TicketData = ({ segment }) => {
  const { origin, destination, date, stops, duration } = segment
  const dataMagic = new DataLogic()
  return (
    <div className={'ticket-item__info'}>
      <div className={'ticket-item__info-style'}>
        <p className={'ticket-item__text text-gray'}>
          {origin} - {destination}
        </p>
        <p className={'ticket-item__text'}>{dataMagic.endTimeCalculator(date, duration)}</p>
      </div>
      <div>
        <p className={'ticket-item__text text-gray'}>В ПУТИ</p>
        <p className={'ticket-item__text'}>{dataMagic.durationFormatter(duration)}</p>
      </div>
      <div>
        <p className={'ticket-item__text text-gray'}>{dataMagic.textFormatter(stops.length)}</p>
        <p className={'ticket-item__text'}>{stops.length ? stops.join(', ') : 'Прямой рейс'}</p>
      </div>
    </div>
  )
}

export default TicketData
