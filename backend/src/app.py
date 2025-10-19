"""
The main Flask app's instance lives here, and Flask blueprints are registered here.
Blueprint imports are paired with their registration for simplicity (sorry PEP 8 purists).
The main script will import the Flask app from here, with all the attached blueprints.
"""
from flask import Flask
import os
import configparser

app = Flask(__name__)

# Load configuration
config = configparser.ConfigParser()
config_path = os.path.join(os.path.dirname(__file__), 'configs', 'default.ini')
if os.path.exists(config_path):
    config.read(config_path)

# Set up app config
app.config['keys.open_ai'] = os.environ.get('OPENAI_API_KEY', config.get('keys', 'open_ai', fallback=''))

from backend.src.endpoints.index import index_blueprint
app.register_blueprint(index_blueprint)

from backend.src.endpoints.chat import chat_blueprint
app.register_blueprint(chat_blueprint)

from backend.src.endpoints.content import content_blueprint
app.register_blueprint(content_blueprint)
