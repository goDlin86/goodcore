from http.server import BaseHTTPRequestHandler
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
from datetime import datetime
import vk_api
from urllib.parse import parse_qs
import json, os

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    parsed_path = parse_qs(self.path)
    print(os.environ.get('SECRET_TOKEN'))
    print(parsed_path)
    if os.environ.get('SECRET_TOKEN') != parsed_path[2]:
      self.send_response(401)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({ 'message': 'Invalid token' }))
      return

    code = os.environ.get('VKTOKEN')
    app = os.environ.get('VKAPPID')
    secret = os.environ.get('VKSECRET')

    vk_session = vk_api.VkApi(token=code, app_id=app, client_secret=secret)

    try:
      vk = vk_session.get_api()
    except vk_api.AuthError as error_msg:
      print(error_msg)
      return

    # CORE RADIO group
    groups = ['-23314431']
    posts = []

    client = FaunaClient(secret=os.environ.get('DBSECRET'))

    for group in groups:
      remote_wall = vk.wall.get(count=10, owner_id=group)

      for post in remote_wall['items']:
        postid = post['id']
        date = datetime.fromtimestamp(post['date']).isoformat()
        text = [t for t in post['text'].split('\n') if len(t) > 1]
        if len(text) > 2:
          title = text[0]
          country = text[2]
          genre = text[1]

          search = client.query(
            q.paginate(
              q.match(
                q.index("titles"),
                title
              )
            )
          )
            
          if not search['data']:

            if ('METALCORE' in genre) or ('DEATHCORE' in genre) or ('POSTHARDCORE' in genre):
              img = [img for img in post['attachments'][0]['photo']['sizes'] if img['type'] == 'x'][0]['url']
              links = [link for link in post['attachments'] if link['type'] == 'link']

              if len(links) > 0:
                url = links[0]['link']['url']
              
                posts.append({
                  'title': title,
                  'date': date,
                  'img': img,
                  'country': country,
                  'genre': genre,
                  'groupid': group,
                  'postid': postid,
                  'url': url
                })

    if len(posts) > 0:
      client.query(
        q.map_(
          lambda post: q.create(
            q.collection("AlbumEntry"),
            {"data": post}
          ),
          posts
        )
      )

    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps({ 'posts': posts }).encode())
    return
