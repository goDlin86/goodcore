import React, { useEffect, useState } from 'react'
//import Link from 'next/link'
import Head from '../components/head'
import Album from '../components/album'
//import { useAlbumEntries } from '../graphql/api'
//import Nav from '../components/nav'
import InfiniteScroll from 'react-infinite-scroll-component'


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

  // useEffect(() => {
  //   getData()
  // }, [])

  const getData = async () => {
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
    console.log(dataByDate)
    setData(dataByDate)
  }

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
            <InfiniteScroll
              dataLength={data.dates.length} //This is important field to render the next data
              next={getData}
              hasMore={true}
              loader={<p>Loading entries...</p>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Больше нет</b>
                </p>
              }>
              {data.dates.map(date => (
                <div>
                  <date class="today">{date.date}</date>
                  <div className="list">
                    {date.albums.map((album, index, allAlbums) => (
                        <Album album={album} index={index} />
                      )
                    )}
                  </div>
                </div>
                )
              )}
            </InfiniteScroll>
          )}
      </section>  
    </div>
  )
}

export default Home
