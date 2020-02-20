import useFetch from '../lib/useFetch'

function getData(data) {
  if (!data || data.errors) return null
  return data.data
}
 
function getErrorMessage(error, data) {
  if (error) return error.message
  if (data && data.errors) {
    return data.errors[0].message
  }
  return null
}

/**
|--------------------------------------------------
| This GraphQL query returns an array of Guestbook
| entries complete with both the provided and implicit
| data attributes.
|
| Learn more about GraphQL: https://graphql.org/learn/
|--------------------------------------------------
*/
export const useAlbumEntries = (cursor = null) => {
  const query = `query Entries($size: Int, $cursor: String) {
    entries(_size: $size, _cursor: $cursor) {
        data {
            _id
            _ts
            title
            img
            country
            genre
            url
        }
        after
    }
  }`
  const size = 8
  const { data, error } = useFetch(process.env.faunaDbGraphQlEndpoint, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.faunaDbSecret}`,
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({
        query,
        variables: { size, cursor },
    }),
  })
 
  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  }
}
 
/**
|--------------------------------------------------
| This GraphQL mutation creates a new GuestbookEntry
| with the requisite twitter handle and story arguments.
|
| It returns the stored data and includes the unique
| identifier (_id) as well as _ts (time created).
|
| The guestbook uses the _id value as the unique key
| and the _ts value to sort and display the date of
| publication.
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const createAlbumEntry = async (title, img, country, genre, url) => {
  const query = `mutation CreateAlbumEntry($title: String!, $img: String!, $country: String!, $genre: String!, $url: String!) {
    createAlbumEntry(data: {
        title: $title,
        img: $img,
        country: $country,
        genre: $genre,
        url: $url
    }) {
        _id
        _ts
        title
        img
        country
        genre
        url
    }
  }`
 
  const res = await fetch(process.env.faunaDbGraphQlEndpoint, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.faunaDbSecret}`,
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({
        query,
        variables: { title, img, country, genre, url },
    }),
  })
  const data = await res.json()
 
  return data
}