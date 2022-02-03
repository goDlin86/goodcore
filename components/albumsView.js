import { useRef, useState, useEffect } from 'react'

import AlbumView from './albumView'

import styles from '../styles/Calendar.module.css'

const AlbumsView = ({ albums }) => {
  const [cur, setCur] = useState(1)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const resizeListener = () => {
      setWidth(ref.current.clientWidth)
      setLeft(-(cur - 1) * ref.current.clientWidth)
    }

    resizeListener()
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  useEffect(() => {
    setCur(1)
    setLeft(0)
  }, [albums])

  const next = (e) => {
    setLeft(left - ref.current.clientWidth)
    setCur(++cur)
    e.stopPropagation()
  }
  const prev = (e) => {
    setLeft(left + ref.current.clientWidth)
    setCur(--cur)
    e.stopPropagation()
  }

  return (
    <div class={styles.albums_container} ref={ref}>
      {albums.length > 1 && <div class={styles.count}><span>{cur}</span>{'\\' + albums.length}</div>}
      <div class={left === 0 ? `${styles.button} ${styles.invisible}` : styles.button} onClick={prev}>&#60;</div>
      <div class={left === -(albums.length - 1) * width ? `${styles.button} ${styles.right} ${styles.invisible}` : `${styles.button} ${styles.right}`} onClick={next}>&#62;</div>
      <div class={styles.albums} style={{transform: 'translate(' + left + 'px)'}}>
        {albums.map(album => <AlbumView album={album} width={width} />)}
      </div>
    </div>
  )
}
  
export default AlbumsView