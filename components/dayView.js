'use client'

import { useEffect, useState } from 'react'

import AlbumsView from './albumsView'

import styles from '../styles/Calendar.module.css'

const DayView = ({ day, curMonth }) => {
  const [isActive, setActive] = useState(false)

  let classList = styles.day + ' '

  if (day.month !== curMonth)
    classList += styles.disable
  else if(day.albums.length === 0 )
    classList += styles.empty

  useEffect(() => setActive(false), [curMonth])

  const click = () => day.albums.length > 0 && setActive(!isActive)

  return (
    <div class={isActive ? `${classList} ${styles.hovered}` : classList} onClick={click}>
      {day.albums.length > 0 ? 
        <AlbumsView albums={day.albums} day={day.date} /> : 
        <div>{day.date}</div>
      }
    </div>
  )
}

export default DayView