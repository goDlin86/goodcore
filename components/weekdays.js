import dayjs from 'dayjs'

import styles from '../styles/Calendar.module.css'

const WeekDays = () => {
    return (
        <div class={styles.weekdays}>
            {[...Array(7).keys()].map((i) => (
                <div class={styles.weekday}>
                    {dayjs().startOf('week').add(i, 'day').format('dddd')}
                </div>
            ))}
        </div>
    )
}

export default WeekDays