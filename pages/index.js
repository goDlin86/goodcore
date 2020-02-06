import React, { useEffect, useState } from 'react';
//import Link from 'next/link';
import Head from '../components/head';
//import Nav from '../components/nav';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/data');
      const newData = await res.json();
      setData(newData);
    }
    getData();
  }, []);

  return (
    <div>
      <Head title="goodcore Releases" description="metalcore, deathcore, post-hardcore releases, link for download" />
      
      <header>
          goo<span class="yellow">d</span>core
      </header>
      <section>
          <h1>Releases</h1>
          <date class="today">05 Feb 2020</date>

          {data ? data.posts.map((post, key) => 
            <album>
              <img src={post.img} />
              <h2>{post.title}</h2>
            </album>
          ) : (
            <span className="loading">loading</span>
          )}
      </section>  
    </div>
  );
};

export default Home;
