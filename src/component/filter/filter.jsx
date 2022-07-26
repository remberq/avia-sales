import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './filter.scss'
import Input from '../input/input'
import { addStatus, clearAllStatus, deleteStatus } from '../../store/checkBoxSlice'

import { Data } from './checkboxData'

const TicketFilter = () => {
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const [list, setList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setList(Data)
  }, [list])

  const handleClickAll = () => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(list.map((li) => li.uid))
    dispatch(clearAllStatus()) // очищаем список заранее, что бы не было дубликатов
    list.forEach((item) => dispatch(addStatus({ id: +item.id }))) // если выбрана галочка Все, проходим по всему списку и все id добавляем в статус
    if (isCheckAll) {
      dispatch(clearAllStatus())
      setIsCheck([])
    }
  }

  const handleClick = (e, key) => {
    const { id, checked } = e.target
    if (!checked) {
      setIsCheckAll(false)
      dispatch(deleteStatus({ id: +key })) // если галочка снята, надо убрать этот id из списка
      setIsCheck(isCheck.filter((item) => item !== id))
    } else {
      if (isCheck.length === 3) {
        setIsCheckAll(true) // если выбраны все галочки то автоматически включаем галочку Все
      }
      setIsCheck([...isCheck, id])
      dispatch(addStatus({ id: +key }))
    }
  }

  const data = list.map(({ uid, id, name }) => {
    return (
      <label key={uid} htmlFor={uid} className={'ticket-form__container'}>
        <Input
          key={uid}
          name={name}
          id={uid}
          handleClick={(e) => handleClick(e, id)}
          isChecked={isCheck.includes(uid)}
        />
        {name}
      </label>
    )
  })

  return (
    <form className={'ticket-form'}>
      <legend className={'ticket-form--text'}>Количество пересадок</legend>
      <label htmlFor="all" className={'ticket-form__container'}>
        <Input key={'all'} name={'Все'} id={'all'} handleClick={handleClickAll} isChecked={isCheckAll} />
        Все
      </label>
      {data}
    </form>
  )
}

export default TicketFilter
