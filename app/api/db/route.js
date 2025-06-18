import { sql } from '@vercel/postgres'
import { VK } from 'vk-io'
import dayjs from 'dayjs'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) return Response.json({ error: 'Invalid token' }, { status: 401 })

  const vk = new VK({ token: process.env.VKSECRET })

  const groupid = '-23314431'
  const wall = await vk.api.wall.get({ owner_id: groupid, count: 10 }) // CORE RADIO group

  const data = await Promise.all(wall.items.map(async post => {
    const postid = post.id
    const date = dayjs.unix(post.date).toISOString()
    const text = post.text.split('\n').filter(t => t.trim().length > 0)

    if (text.length > 1) {
      const title = text[0]
      const genre = text[1]
      const country = text[2] || ''

      if (genre.includes('POSTHARDCORE') || genre.includes('METALCORE') || genre.includes('DEATHCORE') || genre.includes('SCACORE')) {
        const img = post.attachments[0].photo.sizes.filter(i => i.type === 'x')[0].url
        const links = post.attachments.filter(a => a.type === 'link')
        if (links.length > 0) {
          const url = links[0].link.url

          return {
            postid,
            groupid,
            date,
            title,
            country,
            genre,
            img,
            url
          }
        }
      }
    }
  }))
  
  const posts = data.filter(d => d !== undefined)

  try {
    posts.map(async p => await sql`
      INSERT INTO albums (postid, groupid, date, title, country, genre, img, url)
      VALUES (${p.postid}, ${p.groupid}, ${p.date}, ${p.title}, ${p.country}, ${p.genre}, ${p.img}, ${p.url}) 
      ON CONFLICT (postid) DO NOTHING
    `)

    return Response.json(posts)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}