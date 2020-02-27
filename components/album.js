import React from 'react'
import { CSSTransition } from 'react-transition-group'

const Album = ({ album, index }) => (
    <CSSTransition
        in={true}
        timeout={300}
        classNames="album"
      >
        <album>
            <a href={'https://vk.com/feed?w=wall' + album.groupid + '_' + album.postid} target="_blank">
                <img src={album.img} />
                <h2>{album.title}</h2>
                <h3>{album.genre}</h3>
                <h3>{album.country}</h3>
            </a>
        </album>
        <style jsx>{`
            .album {
                transition-delay: ${index * 100}ms;
            }
        `}</style>
    </CSSTransition>
)

export default Album