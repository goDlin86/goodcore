import { useRef, useState, useEffect } from 'react'

import AlbumView from './albumView'

import styles from '../styles/Calendar.module.css'

const AlbumsView = ({ albums }) => {
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef()

  useEffect(() => {
    setWidth(ref.current.clientWidth)
  }, [])

  const next = (e) => {
    setLeft(left - ref.current.clientWidth)
    e.stopPropagation()
  }
  const prev = (e) => {
    setLeft(left + ref.current.clientWidth)
    e.stopPropagation()
  }

  return (
    <div class={styles.albums_container} ref={ref}>
      <div class={left === 0 ? `${styles.button} ${styles.invisible}` : styles.button} onClick={prev}>&#60;</div>
      <div class={left === -(albums.length - 1) * width ? `${styles.button} ${styles.right} ${styles.invisible}` : `${styles.button} ${styles.right}`} onClick={next}>&#62;</div>
      <div class={styles.albums} style={{left: left + 'px'}}>
        {albums.map(album => <AlbumView album={album} width={width} />)}
      </div>
    </div>
  )
}
  
export default AlbumsView