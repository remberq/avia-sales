import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import TicketList from '../ticket-list/ticket-list'
import TicketFilter from '../filter/filter'
import { getFetchTickets } from '../../store/checkBoxSlice'

import logo from './Logo.png'

import './app.scss'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFetchTickets())
  }, [dispatch])

  return (
    <div className="main">
      <img className={'main__logo'} src={logo} alt="logo" />
      <div className={'main__content'}>
        <TicketFilter />
        <TicketList />
      </div>
    </div>
  )
}

export default App
