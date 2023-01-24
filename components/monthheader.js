'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import styles from '../styles/Calendar.module.css'

const MonthHeader = ({ date }) => {
    const d = dayjs(date)

    return (
        <div class={styles.header}>
            <Link class={styles.button} href={'/' + d.add(-1, 'month').format('MMMMYYYY')}>&#60;</Link>
            {d.format('MMMM YYYY')}
            <Link class={styles.button} href={'/' + d.add(1, 'month').format('MMMMYYYY')}>&#62;</Link>
        </div>
    )
}

export default MonthHeader