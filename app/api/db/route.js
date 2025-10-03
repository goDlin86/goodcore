import { sql } from '@vercel/postgres'
import * as cheerio from 'cheerio'

export const maxDuration = 20

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) 
    return Response.json({ error: 'Invalid token' }, { status: 401 })

  const albums = await getPosts('https://coreradio.online/albums')
  const singles = await getPosts('https://coreradio.online/singles')
  const posts = [...albums, ...singles]

  try {
    const res = await Promise.all(posts.map(async p => {
      const q = await sql`
        INSERT INTO albums (postid, groupid, date, title, country, genre, img, url)
        VALUES ('', '', NOW(), ${p.title}, ${p.country}, ${p.genre}, ${p.img}, ${p.url}) 
        ON CONFLICT (title) DO NOTHING
      `
      return { count: q.rowCount }
    }))

    return Response.json(res)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}

async function getPosts(url) {
  const res = await fetch(url)
  const body = await res.text()

  const $ = cheerio.load(body)

  return $('.main-news').toArray().map((item) => ({
    title: $(item).find('.tcarusel-item-title > a').text(),
    url: $(item).find('.tcarusel-item-title > a').attr('href'),
    img: $(item).find('.tcarusel-item-image > a > img').attr('src'),
    genre: $(item).find('.tcarusel-item-descr2').text().split(/\n/)[1].trim(),
    country: $(item).find('.tcarusel-item-descr2').text().split(/\n/)[2].trim(),
  }))
}