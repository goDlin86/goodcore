import styles from '../styles/Calendar.module.css'

const AlbumView = ({ album, width, show }) => {
  const genres = album.genre.substring(6).split('/').map(genre => {
    let classList = styles.genre + ' '

    switch (genre.trim()) {
      case 'Post-Hardcore':
        classList += styles.post_hardcore
        break;
      case 'Metalcore':
        classList += styles.metalcore
        break;
      case 'Deathcore':
        classList += styles.deathcore
        break;
      case 'Electronic':
        classList += styles.electronic
        break;
    }

    return <div class={classList}>{genre}</div>
  })

  return (
    <div class={styles.album}>
      <img src={album.img} style={{maxWidth: width + 'px'}} />
      <div class={show ? `${styles.description} ${styles.invisible}` : styles.description}>
        <a href={'https://vk.com/feed?w=wall' + album.groupid + '_' + album.postid} target='_blank' onClick={e => e.stopPropagation()}>
          <h2 class={album.like && styles.like}>{album.title.replace('[single]', '')}</h2>
        </a>
        {genres}
        <div class={styles.country}>{album.country.substring(8)}</div>
        {album.title.includes('[single]') && <div class={styles.single}>Single</div>}
      </div>
    </div>
  )
}

export default AlbumView