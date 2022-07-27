import { useSelector } from 'react-redux'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Spin } from 'antd'

import TicketListItem from '../ticket-list-item/ticket-list-item'
import TicketPriceFilter from '../price-filter/price-filter'
import ShowMoreTickets from '../more-tickets/more-tickets'

import './ticket-list.scss'
import 'antd/dist/antd.css'
import gif from './40Oj.gif'
import { filterTickets, filterStops } from './filterLogic'

const TicketList = () => {
  const tick = useSelector((state) => state.tickets.tickets)
  const load = useSelector((state) => state.tickets.loadStatus)
  const status = useSelector((state) => state.status.ticketStatus)
  const checkboxStatus = useSelector((state) => state.status.checkboxStatus)
  const [page, setPage] = useState(5)
  if (load) {
    return (
      <div className={'ticket-list-container'}>
        <TicketPriceFilter />
        <div className={'example'}>
          <Spin size={'large'} />
        </div>
        <ShowMoreTickets />
      </div>
    )
  }
  if (!checkboxStatus.length) {
    return (
      <div className={'ticket-list-container'}>
        <TicketPriceFilter />
        <img className={'no-filters--img'} src={gif} alt="travolta_gif" />
        <p className={'no-filters--text'}>Рейсов, подходящих под заданные фильтры, не найдено</p>
        <ShowMoreTickets />
      </div>
    )
  }

  const getTickets = () => {
    const filteredTickets = filterStops(checkboxStatus, tick)
    const sortedTickets = filterTickets(status[0], filteredTickets)
    return sortedTickets.slice(0, page)
  }
  const getTicketsItems = getTickets().map((item) => {
    return <TicketListItem key={uuidv4()} tickets={item} />
  })

  return (
    <div className={'ticket-list-container'}>
      <TicketPriceFilter />
      {getTicketsItems}
      <ShowMoreTickets addPage={() => setPage((page) => page + 5)} />
    </div>
  )
}

export default TicketList
