import React, { useEffect, useState } from 'react'
//import Link from 'next/link'
import Head from '../components/head'
import Album from '../components/album'
//import { useAlbumEntries } from '../graphql/api'
//import Nav from '../components/nav'


// function getEntries(data) {
//   return data ? data.entries.data.reverse() : []
// }

// function getCursor(data) {
//   return data ? data.after : null
// }

function getDataByDate(data) {
  //var now = new Date()

  var dates = data.albums.map(album => album.date)
  dates = [...new Set(dates)]
  dates = dates.map(date => {
    return { date, albums: data.albums.filter(a => a.date === date) }
  })
  
  return {'after': data.after, dates}
}

const Home = () => {
  //const { data, errorMessage } = useAlbumEntries()
  const [data, setData] = useState([])

  // useEffect(() => {
  //   if (!entries.length) {
  //     setEntries(getEntries(data))
  //     setCursor(getCursor(data))
  //   }
  // }, [data, entries.length])

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/getAlbums', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'after': data.after || ''
        }),
      });
      const newData = await res.json()
      const dataByDate = getDataByDate(newData)
      setData(dataByDate)
    }
    getData()
  }, [])

  return (
    <div>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases, link for download" />
      
      <header>
          goo<span class="yellow">d</span>core
      </header>
      <section>
          <h1>Releases</h1>
          {data.length == 0 ? (
            <p>Loading entries...</p>
          ) : (
            data.dates.map(date => {
              return (
                <div>
                  <date class="today">{date}</date>
                  <div className="list">
                    {data.albums.map((album, index, allAlbums) => {
                      const date = new Date(entry._ts / 1000)
                      return (
                        <Album album={album} index={index} />
                      )
                    })
                  }
                  </div>
                </div>
              )
            })
          )}
      </section>  
    </div>
  )
}

export default Home
