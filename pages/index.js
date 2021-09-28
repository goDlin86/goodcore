import useSWRInfinite from 'swr/infinite'
import { useRef, useEffect } from 'react'

import Head from '../components/head'
import Album from '../components/album'
import useOnScreen from '../hooks/useOnScreen'

import ReactGA from 'react-ga'

ReactGA.initialize('UA-26528518-2')

const fetcher = url => fetch(url).then(res => res.json())

function getDataByDate(data) {
  const albums = data.reduce((all, d) => all.concat(d.albums), [])
  var dates = albums.map(a => a.date)
  dates = [...new Set(dates)]
  dates = dates.map(date => ({ date, albums: albums.filter(a => a.date === date) }))

  return { dates }
}

const Home = ({ fallbackData }) => {
  const ref = useRef()
  const isVisible = useOnScreen(ref)

  ReactGA.pageview('/')

  const { data, error, size, setSize, isValidating } = useSWRInfinite((pageIndex, previousPageData) => {
      const prevOrInitialData = previousPageData || initialData
      if (prevOrInitialData && !prevOrInitialData.after.length) return null
      if (pageIndex === 0) return '/api/get'
      return `/api/get?cursor=${prevOrInitialData.after}`
    },
    fetcher,
    { revalidateOnFocus: false, fallbackData }
  )

  const dataByDate = getDataByDate(data ? [].concat(...data) : [])

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = data && data[data.length - 1]?.albums?.length < 8
  const isRefreshing = isValidating && data && data.length === size

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      setSize(size + 1)
    }
  }, [isVisible])//, isRefreshing])

  return (
    <>
      <Head title='goodcore Releases' description='metalcore, deathcore, post-hardcore releases, link for download' />
      
      <header>
        goo<span className="yellow">d</span>core
      </header>
      <section>
        <h1>Releases</h1>
        {isEmpty ? <p>Yay, no albums found.</p> : null}
        {dataByDate.dates.map(date => (
          <div className='list'>
            <date><div className='today'>{date.date}</div></date>
            <div className='albumslist'>
              {date.albums.map((album, index) => (
                  <Album album={album} key={index} />
                )
              )}
            </div>
          </div>
          )
        )}
        <div ref={ref}>
          {isLoadingMore ? <p>Loading...</p> : isReachingEnd ? <p>No more albums.</p> : ''}
        </div>
      </section>  
    </>
  )
}

export async function getServerSideProps() {
  const baseUrl = 'https://goodcore.vercel.app'//http://localhost:3000'
  const data = await fetcher(baseUrl + '/api/get')
  return { props: { fallbackData: data } }
}

export default Home