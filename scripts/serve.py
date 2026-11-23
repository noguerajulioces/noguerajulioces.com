"""Local preview server: like `python3 -m http.server`, plus Cache-Control: no-cache so the browser
always checks for a newer index.html. Versioned assets (?v=) still change URL when their content does.
Run from the project root: python3 -I scripts/serve.py 4173"""
import http.server, sys


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
http.server.ThreadingHTTPServer(("127.0.0.1", port), NoCache).serve_forever()
