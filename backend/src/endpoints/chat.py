from flask import Blueprint, jsonify, request
from backend.src.chatbot import *
from backend.src.app import app

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')


@chat_blueprint.route('/init')
def init():
    print(app.schema.name)
    if request.method == 'GET':
        return jsonify({"content":
            [
                {
                    "id": 0,
                    "role": "assistant",
                    "content": "Hello and welcome! I am Matt's personal AI assistant."
                },
            ]}
        )
    else:
        return None


@chat_blueprint.route('/prompt', methods=['POST'])
def prompt():
    data = request.get_json()
    messages = data.get('messages', '')
    # Example response; replace with your chat logic
    response = {
        "content": [
            {
                "id": 1,
                "role": "assistant",
                "content": f"{get_response(messages)}"
            }
        ]
    }
    return jsonify(response)
