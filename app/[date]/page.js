import { sql } from '@vercel/postgres'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})

import MonthHeader from '/components/monthheader'
import WeekDays from '/components/weekdays'
import DayView from '/components/dayView'

import styles from '/styles/Calendar.module.css'

async function getData(date) {
  const dateStart = date.startOf('month').format('YYYY-MM-DD HH:mm:ss')
  const dateEnd = date.endOf('month').format('YYYY-MM-DD HH:mm:ss')

  let data

  try {
    data = await sql`SELECT * FROM albums WHERE date BETWEEN ${dateStart} AND ${dateEnd}`
  } catch (e) {
    console.log(e)
  }

  return data
}

export default async function Page({ params }) {
  const d = await params
  const date = dayjs(d.date).isValid() ? dayjs(d.date) : dayjs()
  const data = await getData(date)

  const startMonth = date.startOf('month')

  let array = []
  let curWeek = false

  for (let i = 0; i < 42; i++) {
    const curDate = startMonth.add(i - startMonth.day() + 1, 'day')
    const item = {
      date: curDate.date(),
      month: curDate.month(), 
      albums: data.rows.filter(a => curDate.date() === dayjs(a.date).date()).sort(() => 0.5 - Math.random())
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
      <MonthHeader date={dayjs(d.date).isValid() ? d.date : dayjs().format('MMMMYYYY')} />
      <WeekDays />
      <div className={styles.calendar}>
        {days.map((day, i) => <DayView key={i} day={day} curMonth={date.month()} />)}
      </div>
    </>
  )
}