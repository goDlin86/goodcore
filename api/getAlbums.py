from http.server import BaseHTTPRequestHandler
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
from datetime import datetime
import json
import os


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        client = FaunaClient(secret=os.environ.get('DBSECRET'))

        content_len = int(self.headers['content-length'])
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
        after = data['after']

        albums = []
        if len(after) == 0:
            albums = client.query(
                q.map_(
                    lambda x: q.get(q.select(1, x)),
                    q.paginate(
                        q.match(q.index("dateDesc")),
                        size=4
                    )
                )
            )
        else:
            albums = client.query(
                q.map_(
                    lambda x: q.get(q.select(1, x)),
                    q.paginate(
                        q.match(q.index("dateDesc")),
                        size=4,
                        after=after
                    )
                )
            )

        a = []
        for album in albums['data']:
            a.append(album['data'])

        after = ''
        if 'after' in albums:
            after = albums['after'][1].id()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({ 'albums': a, 'after': after }).encode())
        return