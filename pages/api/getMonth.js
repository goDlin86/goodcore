import faunadb, { query as q } from 'faunadb'
import dayjs from 'dayjs'

export default async (req, res) => {
    const { dateStart, dateEnd } = req.query

    const client = new faunadb.Client({ secret: process.env.DBSECRET })
    
    const data = await client.query(
        q.Map(
            q.Paginate(q.Range(q.Match(q.Index("dateDesc")), dateStart || '', dateEnd || '')),
            q.Lambda((x, ref) => q.Get(ref))
        )
    )

    let albums = data['data'].map(a => a['data'])
    albums = albums.map(a => {
        a.date = dayjs(a.date).format('DD MMM YYYY')
        return a
    })
    
    res.status(200).json({ albums })
}