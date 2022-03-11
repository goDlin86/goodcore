import faunadb, { query as q } from 'faunadb'

export default (req, res) => {
    const { id, value } = req.query

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