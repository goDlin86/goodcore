import { sql } from '@vercel/postgres'
import * as cheerio from 'cheerio'

export const maxDuration = 20

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.CRON_SECRET) 
    return Response.json({ error: 'Invalid token' }, { status: 401 })

  const albums = await getPosts('https://coreradio.online/albums')
  const singles = await getPosts('https://coreradio.online/singles')
  const posts = [...albums, ...singles]

  const columns = ['title', 'country', 'genre', 'img', 'url']
  const { query, values } = bulkInsertQuery(columns, posts)

  try {
    const q = await sql.query(query, values)
    return Response.json({ message: q.rowCount })
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

function bulkInsertQuery(columns, rows) {
  let query = `INSERT INTO albums (${columns.join(', ')}) VALUES `
  let values = []
  let placeholders = []
  let paramIndex = 1

  rows.forEach((row, rowIndex) => {
    const rowPlaceholders = columns.map(col => `$${paramIndex++}`).join(', ')
    placeholders.push(`(${rowPlaceholders})`)
    columns.forEach(col => values.push(row[col]))
  })

  query += placeholders.join(', ') + ' ON CONFLICT (title) DO NOTHING;'
  return { query, values }
}