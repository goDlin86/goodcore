'use client'

import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})

import { createContext, useState } from 'react'

import MonthHeader from '/components/monthheader'

export const DateContext = createContext(null)

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(dayjs())

  const changeDate = (i) => {
    setDate(date.add(i, 'month'))
  } 

  return (
    <DateContext.Provider value={date}>
      <MonthHeader date={date} changeDate={changeDate} />
      {children}
    </DateContext.Provider>
  )
}