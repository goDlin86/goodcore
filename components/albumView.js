import styles from '../styles/Calendar.module.css'

const AlbumView = ({ album, width, show }) => (
  <div class={styles.album}>
    <img src={album.img} style={{maxWidth: width + 'px'}} />
    <div class={show ? `${styles.description} ${styles.invisible}` : styles.description}>
      <a href={'https://vk.com/feed?w=wall' + album.groupid + '_' + album.postid} target='_blank' onClick={e => e.stopPropagation()}>
        <h2>{album.title}</h2>
      </a>
      {album.genre.substring(6).split('/').map(genre => <div class={styles.genre + (genre.trim() === 'Post-Hardcore' ? (' ' + styles.post_hardcore) : genre.trim() === 'Electronic' ? (' ' + styles.electronic) : '')}>{genre}</div>)}
      <div class={styles.country}>{album.country.substring(8)}</div>
    </div>
  </div>
)

export default AlbumView