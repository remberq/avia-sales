import './more-tickets.scss'

const ShowMoreTickets = ({ addPage }) => {
  return (
    <button className={'add-btn'} onClick={addPage}>
      {' '}
      Показать еще 5 билетов!
    </button>
  )
}

export default ShowMoreTickets
