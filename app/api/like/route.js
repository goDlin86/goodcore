

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const id = searchParams.get('id')
  const value = searchParams.get('value')
  

  
  //console.log(ret)

  // .catch((err) => console.error(
  //   'Error: [%s] %s: %s',
  //   err.name,
  //   err.message,
  //   err.errors()[0].description,
  // ))

  return Response.json({ message: 'Like updated successfully' })
}