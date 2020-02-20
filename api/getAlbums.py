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

        print(post_body)

        # if isFirstPage:
        #     albums = client.query(
        #         q.map_(
        #             lambda x: q.get(q.select(1, x)),
        #             q.paginate(
        #                 q.match(q.index("dateDesc")),
        #                 size=4
        #             )
        #         )
        #     )
        # else:
        #     albums = client.query(
        #         q.map_(
        #             lambda x: q.get(q.select(1, x)),
        #             q.paginate(
        #                 q.match(q.index("dateDesc")),
        #                 size=4,
        #                 after=afterPtr
        #             )
        #         )
        #     )


        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({ 'posts': post_body.encode("UTF-8") }).encode())
        return