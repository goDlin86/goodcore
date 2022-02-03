import { useRef, useState, useEffect } from 'react'

import AlbumView from './albumView'

import styles from '../styles/Calendar.module.css'

const AlbumsView = ({ albums }) => {
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
  }, [albums])

  const next = (e) => {
    setLeft(left - width)
    setCur(++cur)
    e.stopPropagation()
  }
  const prev = (e) => {
    setLeft(left + width)
    setCur(--cur)
    e.stopPropagation()
  }

  return (
    <div class={styles.albums_container} ref={ref}>
      {albums.length > 1 && <div class={styles.count}><span>{cur}</span>{'\\' + albums.length}</div>}
      <div class={cur === 1 ? `${styles.button} ${styles.invisible}` : styles.button} onClick={prev}>&#60;</div>
      <div class={cur === albums.length ? `${styles.button} ${styles.right} ${styles.invisible}` : `${styles.button} ${styles.right}`} onClick={next}>&#62;</div>
      <div class={styles.albums} style={{transform: 'translate(' + left + 'px)'}}>
        {albums.map(album => <AlbumView album={album} width={width} />)}
      </div>
    </div>
  )
}
  
export default AlbumsView