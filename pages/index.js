import React, { useEffect, useState } from 'react'
//import Link from 'next/link'
import Head from '../components/head'
import Album from '../components/album'
//import { useAlbumEntries } from '../graphql/api'
//import Nav from '../components/nav'


function getEntries(data) {
  return data ? data.entries.data.reverse() : []
}

function getCursor(data) {
  return data ? data.after : null
}

const Home = () => {
  //const { data, errorMessage } = useAlbumEntries()
  const [entries, setEntries] = useState([])
  //const [cursor, setCursor] = useState(null)

  // useEffect(() => {
  //   if (!entries.length) {
  //     setEntries(getEntries(data))
  //     setCursor(getCursor(data))
  //   }
  // }, [data, entries.length])

  useEffect(() => {
    async function getEntries() {
      const res = await fetch('/api/getAlbums', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'after': 'sadasd'
        }),
      });
      const newEntries = await res.json()
      console.log(newEntries)
      setEntries(newEntries)
    }
    getEntries()
  }, [])

  return (
    <div>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases, link for download" />
      
      <header>
          goo<span class="yellow">d</span>core
      </header>
      <section>
          <h1>Releases</h1>
          <date class="today">10 Feb 2020</date>

          <div className="list">
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : !data ? (
              <p>Loading entries...</p>
            ) : (
              entries.map((entry, index, allEntries) => {
                const date = new Date(entry._ts / 1000)
                return (
                  <Album album={entry} index={index} />
                )
              })
            )}
          </div>
      </section>  
    </div>
  )
}

export default Home
