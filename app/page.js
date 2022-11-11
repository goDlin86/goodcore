import Calendar from '../components/calendar'

import ReactGA from 'react-ga4'
ReactGA.initialize('G-QZS1DJJ7DN')

export default function Page() {
    ReactGA.send('pageview')

    return (
        <Calendar />
    )
}