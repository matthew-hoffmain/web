from flask import Blueprint, jsonify, request
from backend.src.chatbot import *
from backend.src.app import app
import os
import json

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')


@chat_blueprint.route('/init')
def init():
    if request.method == 'GET':
        static_dir = os.path.join(os.path.dirname(__file__), '..', 'static', 'corpus')
        file_path = os.path.join(static_dir, 'about_virgil.json')
        with open(file_path, 'r', encoding='utf-8') as f:
            content = json.load(f)
            return jsonify(
                {"content":
                    content
                }
            )
    else:
        return None


@chat_blueprint.route('/prompt', methods=['POST'])
def prompt():
    data = request.get_json()
    messages = data.get('messages', '')
    idCounter = data.get('idCounter', 0)
    # Example response; replace with your chat logic
    response_content = get_response(messages, idCounter + 1)
    response = {
        "content": [
            {
                "id": idCounter + 1,
                "role": "assistant",
                "content": f"{response_content}",
                "visible": True
            }
        ]
    }
    print(response)
    return jsonify(response)
