import { NextResponse } from 'next/server'
import faunadb, { query as q } from 'faunadb'
import { VK } from 'vk-io'
import dayjs from 'dayjs'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const client = new faunadb.Client({ secret: process.env.DBSECRET })

  const vk = new VK({ token: process.env.VKSECRET })

  const groupid = '-23314431'
  const wall = await vk.api.wall.get({ owner_id: groupid, count: 10 }) // CORE RADIO group

  const data = await Promise.all(wall.items.map(async post => {
    const postid = post.id
    const date = dayjs.unix(post.date).toISOString()
    const text = post.text.split('\n').filter(t => t.length > 0)

    if (text.length > 1) {
      const title = text[0]
      const genre = text[1]
      const country = text[2] || ''

      const exists = await client.query(
        q.Exists(
          q.Match(
            q.Index('titles'), 
            title
          )
        )
      )

      if (!exists) {
        if (genre.includes('POSTHARDCORE') || genre.includes('METALCORE') || genre.includes('DEATHCORE')) {
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
    }
  }))
  
  const posts = data.filter(d => d !== undefined)

  if (posts.length > 0) {
    await client.query(
      q.Map(
        posts,
        q.Lambda('post', q.Create(q.Collection('AlbumEntry'), { data: q.Var('post') }))
      )
    )
  }
  
  return NextResponse.json(posts)
}