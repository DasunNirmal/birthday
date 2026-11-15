"""Run the birthday page locally: python run.py"""
import http.server
import os
import socketserver

os.chdir(os.path.dirname(os.path.abspath(__file__)))
PORT = 8000

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

socketserver.TCPServer.allow_reuse_address = True
while True:
    try:
        server = socketserver.TCPServer(("", PORT), Quiet)
        break
    except OSError:
        PORT += 1

url = f"http://localhost:{PORT}/index.html"
print("Birthday page running at", url)
print("Open that URL in your browser. Press Ctrl+C to stop.")
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nStopped.")
