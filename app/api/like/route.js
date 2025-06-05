import { sql } from '@vercel/postgres'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')
  
  try {
    await sql`UPDATE albums SET "like" = NOT "like" WHERE id = ${id}`
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }

  return Response.json({ message: 'Like updated successfully' })
}