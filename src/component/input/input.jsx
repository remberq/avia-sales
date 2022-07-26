import './input.scss'
const Input = ({ id, handleClick, isChecked }) => {
  return <input className={'input-filter'} id={id} type="checkbox" onChange={handleClick} checked={isChecked} />
}

export default Input
