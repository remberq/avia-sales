import { useDispatch } from 'react-redux'

import Button from '../button/button'
import { changeTicketStatus } from '../../store/checkBoxSlice'
import './price-filter.scss'

const TicketPriceFilter = () => {
  const dispatch = useDispatch()

  const addTicketFilterStatus = (e) => {
    e.preventDefault()
    dispatch(changeTicketStatus({ text: e.target.id }))
  }

  return (
    <div className={'ticket-filter'}>
      <Button id={'cheap'} click={addTicketFilterStatus}>
        Самый дешевый
      </Button>
      <Button id={'fast'} click={addTicketFilterStatus}>
        Самый быстрый
      </Button>
      <Button id={'opti'} click={addTicketFilterStatus}>
        Оптимальный
      </Button>
    </div>
  )
}

export default TicketPriceFilter
