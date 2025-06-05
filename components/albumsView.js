import { useRef, useState, useEffect } from 'react'

import AlbumView from './albumView'

import styles from '../styles/Calendar.module.css'

const AlbumsView = ({ albums, day }) => {
  const [showCover, setShowCover] = useState(false)
  const [like, setLike] = useState(false)
  const [cur, setCur] = useState(1)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  const resizeListener = () => setWidth(ref.current.clientWidth)

  useEffect(() => {
    resizeListener()
    window.addEventListener('resize', resizeListener)

    return () => window.removeEventListener('resize', resizeListener)
  }, [])

  useEffect(() => {
    setLeft(-(cur - 1) * width)
  }, [width])

  useEffect(() => {
    setCur(1)
    setLeft(0)
    setShowCover(false)
    setLike(albums[0].like)
  }, [albums])

  const next = (e) => {
    setLeft(left - width)
    setLike(albums[cur].like)
    setCur(c => c + 1)
    e.stopPropagation()
  }
  const prev = (e) => {
    setLeft(left + width)
    setLike(albums[cur - 2].like)
    setCur(c => c - 1)
    e.stopPropagation()
  }

  const toggleShowCover = (e) => {
    setShowCover(!showCover)
    e.stopPropagation()
  }

  const toggleLike = (e) => {
    setLike(!like)
    albums[cur - 1].like = !albums[cur - 1].like
    fetch('/api/like?id=' + albums[cur - 1].id)
    e.stopPropagation()
  }

  return (
    <div className={styles.albums_container} ref={ref}>
      <div className={showCover ? `${styles.date} ${styles.invisible}` : styles.date}>{day}</div>
      <div className={showCover ? `${styles.thumbs_up} ${styles.invisible}` : like ? `${styles.thumbs_up} ${styles.up}` : styles.thumbs_up} onClick={toggleLike}></div>
      <div className={showCover ? `${styles.cover} ${styles.show}` : styles.cover} onClick={toggleShowCover}></div>
      {albums.length > 1 && <div className={showCover ? `${styles.count} ${styles.invisible}` : styles.count}><span>{cur}</span>{'\\' + albums.length}</div>}
      <div className={cur === 1 || showCover ? `${styles.button} ${styles.invisible}` : styles.button} onClick={prev}>&#60;</div>
      <div className={cur === albums.length || showCover ? `${styles.button} ${styles.right} ${styles.invisible}` : `${styles.button} ${styles.right}`} onClick={next}>&#62;</div>
      <div className={styles.albums} style={{transform: 'translate(' + left + 'px)'}}>
        {albums.map((album, i) => <AlbumView key={i} album={album} width={width} show={showCover} />)}
      </div>
    </div>
  )
}
  
export default AlbumsView