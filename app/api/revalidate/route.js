import { revalidatePath } from 'next/cache'
import dayjs from 'dayjs'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }

  try {
    revalidatePath('/' + dayjs().format('MMMMYYYY'))
  } catch (err) {
    return Response.json({ error: 'Error revalidating' }, { status: 500 })
  }

  return Response.json({ revalidated: true })
}