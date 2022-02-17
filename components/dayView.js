import { useEffect, useState } from 'react'

import AlbumsView from './albumsView'

import styles from '../styles/Calendar.module.css'

const DayView = ({ day, month }) => {
  const [isActive, setActive] = useState(false)

  let classList = styles.day + ' '

  if (day.date.month() !== month)
    classList += styles.disable
  else if(day.albums.length === 0 )
    classList += styles.empty

  useEffect(() => setActive(false), [month])

  const click = () => {
    if (classList.includes(styles.disable) || classList.includes(styles.empty))
      return
    setActive(!isActive)
  }

  return (
    <div class={isActive ? `${classList} ${styles.hovered}` : classList} onClick={click}>
      {day.albums.length > 0 ? 
        <AlbumsView albums={day.albums} day={day.date.date()} /> : 
        <div>{day.date.date()}</div>
      }
    </div>
  )
}

export default DayView