import React, { useEffect, useState } from 'react';
//import Link from 'next/link';
import Head from '../components/head';
import { useAlbumEntries } from '../graphql/api'
//import Nav from '../components/nav';

function getEntries(data) {
  return data ? data.entries.data.reverse() : []
}

const Home = () => {
  const { data, errorMessage } = useAlbumEntries()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!entries.length) {
      setEntries(getEntries(data))
    }
  }, [data, entries.length])

  return (
    <div>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases, link for download" />
      
      <header>
          goo<span class="yellow">d</span>core
      </header>
      <section>
          <h1>Releases</h1>
          <date class="today">10 Feb 2020</date>

          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : !data ? (
            <p>Loading entries...</p>
          ) : (
            entries.map((entry, index, allEntries) => {
              const date = new Date(entry._ts / 1000)
              return (
                <album>
                  <img src={entry.img} />
                  <h2>{entry.title}</h2>
                </album>
              )
            })
          )}
      </section>  
    </div>
  );
};

export default Home;
