"""
The main Flask app's instance lives here, and Flask blueprints are registered here.
Blueprint imports are paired with their registration for simplicity (sorry PEP 8 purists).
The main script will import the Flask app from here, with all the attached blueprints.
"""
from flask import Flask
app = Flask(__name__)

from backend.src.endpoints.index import index_blueprint
app.register_blueprint(index_blueprint)

from backend.src.endpoints.chat import chat_blueprint
app.register_blueprint(chat_blueprint)

from backend.src.endpoints.content import content_blueprint
app.register_blueprint(content_blueprint)
