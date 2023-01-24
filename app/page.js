import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})

import { redirect } from 'next/navigation'

export default async function Page() {
    redirect('/' + dayjs().format('MMMMYYYY'))
}