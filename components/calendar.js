'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})
//import 'dayjs/locale/ru'
//dayjs.locale('ru')

import MonthHeader from './monthheader'
import WeekDays from './weekdays'
import DayView from './dayView'

import styles from '../styles/Calendar.module.css'

const Calendar = () => {
  const [days, setDays] = useState([])
  const [date, setDate] = useState(dayjs())

  useEffect(() => {
    
    getData()
    
  }, [date])

  const getData = async () => {
    const dateStart = date.endOf('month').toISOString().slice(0, -5)
    const dateEnd = date.startOf('month').toISOString().slice(0, -5)

    const res = await fetch(`/api/getMonth?dateStart=${dateStart}&dateEnd=${dateEnd}`)
    const data = await res.json()

    const startMonth = date.startOf('month')

    let array = []
    let curWeek = false

    for (let i = 0; i < 42; i++) {
      const curDate = startMonth.add(i - startMonth.day() + 1, 'day')
      const item = {
        date: curDate, 
        albums: data.albums.filter(a => curDate.format('DD MMM YYYY') === a.date).sort(() => 0.5 - Math.random())
      }
      array.push(item)

      if (!curWeek && dayjs().diff(curDate, 'd') === 0)
        curWeek = true

      if (curWeek && curDate.day() === 0)
        break
    }

    setDays(array.reverse())
  }

  const changeDate = (i) => {
    setDate(date.add(i, 'month'))
  } 

  return (
    <>
      <MonthHeader date={date} changeDate={changeDate} />
      <WeekDays />
      <div class={styles.calendar}>
        {days.map(day => <DayView day={day} month={date.month()} />)}
      </div>
    </>
  )
}
  
export default Calendar