'use client'

import useSWRInfinite from 'swr/infinite'
import { useRef, useEffect } from 'react'

import Album from '../../components/album'
import useOnScreen from '../../hooks/useOnScreen'

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

  const { data, error, size, setSize, isValidating } = useSWRInfinite((pageIndex, previousPageData) => {
      const prevOrInitialData = previousPageData || fallbackData
      console.log(pageIndex)
      if (prevOrInitialData && !prevOrInitialData.after.length) return null
      if (pageIndex === 0) return '/api/get'
      return `/api/get?cursor=${prevOrInitialData.after}`
    },
    fetcher,
    { revalidateOnFocus: false, fallbackData: fallbackData && [fallbackData] }
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
        {isEmpty ? <p>No albums found.</p> : null}
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
    </>
  )
}

export default Home