const Album = ({ album, index }) => (
    <album style={{'transitionDelay': `${ index * .1 }s`}}>
        <a href={'https://vk.com/feed?w=wall' + album.groupid + '_' + album.postid} target="_blank">
            <img src={album.img} />
            <h2>{album.title}</h2>
            <h3>{album.genre}</h3>
            <h3>{album.country}</h3>
        </a>
    </album>
)

export default Album