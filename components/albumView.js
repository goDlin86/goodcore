import styles from '../styles/Calendar.module.css'

const AlbumView = ({ album, width, show }) => {
  const genres = album.genre.split('/').map(genre => {
    let classList = styles.genre + ' '
    genre = genre.trim().replace(/^#(\S+)@coreradio$/, '$1')

    switch (genre) {
      case 'POSTHARDCORE':
        classList += styles.post_hardcore
        break;
      case 'METALCORE':
        classList += styles.metalcore
        break;
      case 'DEATHCORE':
        classList += styles.deathcore
        break;
      case 'ELECTRONIC':
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
          <h2 class={album.like && styles.like}>
            {album.title.replace('[single]', '').replace(/\[club\d+\|(.*)\]/, '$1').replace(/\[https:\/\/vk.com\/.+\|(.*)\]/, '$1')}
          </h2>
        </a>
        {genres}
        {album.country && album.country.includes('Country') && <div class={styles.country}>{album.country}</div>}
        {album.title.includes('[single]') && <div class={styles.single}>Single</div>}
      </div>
    </div>
  )
}

export default AlbumView