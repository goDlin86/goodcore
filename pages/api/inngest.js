import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'goodcore' })

const getAlbums = inngest.createFunction(
  { name: 'Get albums' }, 
  { cron: '0 */12 * * *' }, 
  async ({ event, step }) => {
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

export default serve(inngest, [ getAlbums ])