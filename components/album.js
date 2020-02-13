import React from 'react';

const Album = ({ album, index }) => (
    <album>
        <a href={album.url} target="_blank">
            <img src={album.img} />
            <h2>{album.title}</h2>
            <h3>{album.genre}</h3>
            <h3>{album.country}</h3>
        </a>
        <style jsx>{`
            album {
                opacity: 1;
                transition-delay: ${index * 100}ms;
            }
        `}</style>
    </album>
)

export default Album;