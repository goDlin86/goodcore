import dayjs from 'dayjs'

import styles from '../styles/Calendar.module.css'

const WeekDays = () => {
    return (
        <div className={styles.weekdays}>
            {[...Array(7).keys()].map((i) => (
                <div className={styles.weekday} key={i}>
                    {dayjs().startOf('week').add(i, 'day').format('dddd')}
                </div>
            ))}
        </div>
    )
}

export default WeekDays