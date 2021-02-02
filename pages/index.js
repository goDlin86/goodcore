import React, { useEffect, useState } from 'react'
import Head from '../components/head'
import Album from '../components/album'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-26528518-2')

function getDataByDate(oldData, newData) {
  const oldAlbums = oldData.dates ? oldData.dates.reduce((all, d) => all.concat(d.albums), []) : []
  const allAlbums = oldAlbums.concat(newData.albums)
  var dates = allAlbums.map(a => a.date)
  dates = [...new Set(dates)]
  dates = dates.map(date => {
    return { date, albums: allAlbums.filter(a => a.date === date) }
  })

  return { 'afterDate': newData.afterDate, 'after': newData.after, dates }
}

const Home = () => {
  const [data, setData] = useState([])

  ReactGA.pageview('')

  useEffect(() => {
     getData()
  }, [])

  const getData = async () => {
    const res = await fetch('/api/getAlbums', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'after': data.after || '',
        'afterDate': data.afterDate || ''
      }),
    });
    const newData = await res.json()
    const dataByDate = getDataByDate(data, newData)
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
            <p>Loading...</p>
          ) : (
            <InfiniteScroll
              dataLength={data.dates.reduce((count, d) => count + d.albums.length, 0)}
              next={getData}
              hasMore={true}
              style={{'overflow': 'unset'}}
              scrollThreshold={0.95}
              loader={<p>Loading...</p>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Больше нет</b>
                </p>
              }>
              {data.dates.map(date => (
                <TransitionGroup className="list">
                  <date><div class="today">{date.date}</div></date>
                  <div className="albumslist">
                  {date.albums.map((album, index, allAlbums) => (
                      <CSSTransition
                        in={true}
                        timeout={300}
                        classNames="album"
                      >
                        <Album album={album} index={index} />
                      </CSSTransition>
                    )
                  )}
                  </div>
                </TransitionGroup>
                )
              )}
            </InfiniteScroll>
          )}
      </section>  
    </div>
  )
}

export default Home
