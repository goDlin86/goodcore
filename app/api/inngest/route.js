import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

const inngest = new Inngest({ id: 'goodcore' })

const getAlbums = inngest.createFunction(
  { name: 'Get albums' }, 
  { cron: '0 */12 * * *' }, 
  async ({ step }) => {
    await step.run('db', async () => { 
      const res = await fetch('https://goodcore.vercel.app/api/db?secret=' + process.env.SECRET_TOKEN)
      return await res.json()
    })
    await step.run('revalidate', async () => { 
      const res = await fetch('https://goodcore.vercel.app/api/revalidate?secret=' + process.env.SECRET_TOKEN)
      return await res.json()
    })
  }
)

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    getAlbums
  ],
})