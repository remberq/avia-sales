import './ticket-list-item.scss'
import TicketData from '../ticket-data/ticket-data'

const TicketListItem = ({ tickets }) => {
  const { segments, price, carrier } = tickets

  return (
    <li className={'ticket-item__container'}>
      <div className={'ticket-item__price-logo'}>
        <span className={'price-logo--text'}>{price} Р</span>
        <img className={'price-logo--logo'} src={`https://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      <div className={'ticket-item__info--container'}>
        <TicketData segment={segments[0]} />
        <TicketData segment={segments[1]} />
      </div>
    </li>
  )
}

export default TicketListItem
