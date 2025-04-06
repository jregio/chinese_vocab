#!/usr/bin/env python3
"""
Simple HTTP server for the Chinese Vocabulary Checker app.
Run with: python3 server.py
"""

import sys
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3000

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == "__main__":
    print(f"Starting server at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop the server")
    
    server = HTTPServer(("", PORT), CORSRequestHandler)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0) 