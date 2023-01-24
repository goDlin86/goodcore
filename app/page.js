import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})
//import 'dayjs/locale/ru'
//dayjs.locale('ru')

import { useContext } from 'react'

import WeekDays from '/components/weekdays'
import DayView from '/components/dayView'

import styles from '/styles/Calendar.module.css'
import { DateContext } from './date-provider'

async function getData(date) {
  const dateStart = date.endOf('month').toISOString().slice(0, -5)
  const dateEnd = date.startOf('month').toISOString().slice(0, -5)

  const res = await fetch(`https://goodcore.vercel.app/api/getMonth?dateStart=${dateStart}&dateEnd=${dateEnd}`)
  const data = await res.json()

  return data
}

export default async function Page() {
  //const date = useContext(DateContext)
  const date = dayjs()
  const data = await getData(date)

  const startMonth = date.startOf('month')

  let array = []
  let curWeek = false

  for (let i = 0; i < 42; i++) {
    const curDate = startMonth.add(i - startMonth.day() + 1, 'day')
    const item = {
      date: curDate.date(),
      month: curDate.month(), 
      albums: data.albums.filter(a => curDate.format('DD MMM YYYY') === a.date).sort(() => 0.5 - Math.random())
    }
    array.push(item)

    if (!curWeek && dayjs().diff(curDate, 'd') === 0)
      curWeek = true

    if (curWeek && curDate.day() === 0)
      break
  }

  const days = array.reverse()

  return (
    <>
      <WeekDays />
      <div class={styles.calendar}>
        {days.map(day => <DayView day={day} curMonth={date.month()} />)}
      </div>
    </>
  )
}