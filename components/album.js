import React from 'react';

const Album = ({ album }) => (
    <album>
        <a href={album.url} target="_blank">
            <img src={album.img} />
            <h2>{album.title}</h2>
            <h3>{album.genre}</h3>
            <h3>{album.country}</h3>
        </a>
    </album>
)

export default Album;