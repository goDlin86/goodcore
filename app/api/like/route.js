import { NextResponse } from 'next/server'
import faunadb, { query as q } from 'faunadb'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')
  const value = searchParams.get('value')

  const client = new faunadb.Client({ secret: process.env.DBSECRET })
  
  client.query(
    q.Update(
      q.Ref(q.Collection('AlbumEntry'), id),
      {
        data: {
          like: value === 'true'
        }
      }
    )
  )
  .then((ret) => console.log(ret))
  .catch((err) => console.error(
    'Error: [%s] %s: %s',
    err.name,
    err.message,
    err.errors()[0].description,
  ))
}