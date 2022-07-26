import { useSelector } from 'react-redux'

const Button = ({ children, click, id }) => {
  const activeButton = useSelector((state) => state.status.ticketStatus)
  const setActive = activeButton[0] === id ? 'active' : ''
  return (
    <button id={id} onClick={click} className={`ticket-btn ${setActive}`}>
      {children}
    </button>
  )
}

export default Button
