import dayjs from 'dayjs'

import styles from '../styles/Calendar.module.css'

const MonthHeader = ({ date, changeDate }) => {
    return (
        <div class={styles.header}>
            <div class={styles.button} onClick={() => changeDate(-1)}>&#60;</div>
            {date.format('MMMM YYYY')}
            <div class={styles.button} onClick={() => changeDate(1)}>&#62;</div>
        </div>
    )
}

export default MonthHeader