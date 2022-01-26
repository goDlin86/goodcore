import { useRef, useEffect } from 'react'

import Head from '../../components/head'
import Calendar from '../../components/calendar'


const Home = () => {

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