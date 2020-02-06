from http.server import BaseHTTPRequestHandler
from datetime import datetime
import vk_api
import json
import os

class handler(BaseHTTPRequestHandler):

  def do_GET(self):
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

    for group in groups:
      remote_wall = vk.wall.get(count=10, owner_id=group)

      for post in remote_wall['items']:
        # id = post['id']
        date = post['date']
        text = [t for t in post['text'].split('\n') if len(t) > 1]
        if len(text) > 2:
          title = text[0]
          country = text[2]
          genre = text[1]

          if ('2020' in title) and (('Metalcore' in genre) or ('Deathcore' in genre) or ('Post-Hardcore' in genre)):
            img = [img for img in post['attachments'][0]['photo']['sizes'] if img['type'] == 'z'][0]['url']

            if 'Post-Hardcore' in genre:
              style = 'Post-Hardcore'
            elif 'Deathcore' in genre:
              style = 'Deathcore'
            else:
              style = 'Metalcore'

            posts.append({
              'title': title,
              'img': img,
              'country': country,
              'genre': genre,
              'style': style
            })

    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(posts))
    return