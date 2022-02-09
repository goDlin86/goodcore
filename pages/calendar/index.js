import ReactGA from 'react-ga'

import Head from '../../components/head'
import Calendar from '../../components/calendar'

ReactGA.initialize('UA-26528518-2')

const Home = () => {
  ReactGA.pageview('calendar')

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