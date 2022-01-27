import { useState } from 'react'

import AlbumView from './albumView'

import styles from '../styles/Calendar.module.css'

const DayView = ({ day, month }) => {
  const [isActive, setActive] = useState(false)

  let classList = styles.day + ' '

  if (day.date.month() !== month)
    classList += styles.disable
  else if(day.albums.length === 0 )
    classList += styles.empty
  else if (day.date.day() === 1)
    classList += styles.left
  else if (day.date.day() === 0)
    classList += styles.right

  const click = () => {
    if (classList.includes(styles.disable) || classList.includes(styles.empty))
      return
    setActive(!isActive)
  }

  return (
    <div class={isActive ? `${classList} ${styles.hovered}` : classList} onClick={click}>
      <div class={day.albums.length > 0 && styles.date}>{day.date.date()}</div>

      {day.albums.length > 0 && <AlbumView album={day.albums[0]} />}
      {/* {day.albums.map(a => <div>{a.title}</div>)} */}
    </div>
  )
}

export default DayView