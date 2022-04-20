import ReactGA from 'react-ga4'

import Head from '../../components/head'
import Calendar from '../../components/calendar'

ReactGA.initialize('G-QZS1DJJ7DN')

const Home = () => {
  ReactGA.send({ hitType: 'pageview', page: '/calendar' })

  return (
    <>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases" />
      
      <header>
        goo<span className="yellow">d</span>core
      </header>
      <section>
        <h1>Releases</h1>
        
        <Calendar />

      </section>  
    </>
  )
}

export default Home