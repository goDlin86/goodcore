import { useSWRInfinite } from 'swr'
import Head from '../components/head'
import Album from '../components/album'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ReactGA from 'react-ga'

ReactGA.initialize('UA-26528518-2')

const fetcher = url => fetch(url).then(res => res.json())

function getDataByDate(data) {
  const albums = data.reduce((all, d) => all.concat(d.albums), [])
  var dates = albums.map(a => a.date)
  dates = [...new Set(dates)]
  dates = dates.map(date => {
    return { date, albums: albums.filter(a => a.date === date) }
  })

  return { dates }
}

const Home = () => {
  //ReactGA.pageview('/')

  const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.after.length) return null
      if (pageIndex === 0) return `/api/get`
      return `/api/get?cursor=${previousPageData.after}`
    },
    fetcher
  )

  const dataByDate = getDataByDate(data ? [].concat(...data) : [])

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < 8)

  return (
    <div>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases, link for download" />
      
      <header>
          goo<span className="yellow">d</span>core
      </header>
      <section>
          <h1>Releases</h1>
          <InfiniteScroll
            dataLength={dataByDate.dates.reduce((count, d) => count + d.albums.length, 0)}
            next={() => setSize(size + 1)}
            hasMore={!isLoadingMore || !isReachingEnd}
            style={{'overflow': 'unset'}}
            scrollThreshold={0.95}
            loader={<p>Loading...</p>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Больше нет</b>
              </p>
            }>
            {dataByDate.dates.map(date => (
              <TransitionGroup className="list">
                <date><div className="today">{date.date}</div></date>
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
      </section>  
    </div>
  )
}

export default Home
