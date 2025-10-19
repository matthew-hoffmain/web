from flask import Blueprint, jsonify, request
from backend.src.chatbot import *
from backend.src.app import app
from backend.src.conversation_store import load_conversation, save_conversation, clear_conversation
import os
import json

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')


@chat_blueprint.route('/init')
def init():
    if request.method == 'GET':
        # Get user ID from cookies
        user_id = request.cookies.get('userId')

        if user_id:
            # Try to load existing conversation for this user
            stored_messages = load_conversation(user_id)
            if stored_messages:
                return jsonify({"content": stored_messages})

        # Fall back to default about_virgil.json if no stored conversation
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


@chat_blueprint.route('/clear', methods=['POST'])
def clear():
    """Clear the user's conversation history."""
    user_id = request.cookies.get('userId')
    if user_id:
        clear_conversation(user_id)
        return jsonify({"success": True, "message": "Conversation cleared"})
    return jsonify({"success": False, "message": "No user ID found"}), 400


@chat_blueprint.route('/prompt', methods=['POST'])
def prompt():
    data = request.get_json()
    messages = data.get('messages', '')
    idCounter = data.get('idCounter', 0)
    user_id = request.cookies.get('userId')

    # Example response; replace with your chat logic
    response_data = get_response('openai', 'gpt4', app.config['keys.open_ai'], messages, idCounter + 1)
    response = {
        "content": [
            {
                "id": idCounter + 1,
                "role": "assistant",
                "content": response_data['content'],
                "audio_filename": response_data['audio_filename'],
                "visible": True
            }
        ]
    }

    # Save the updated conversation including the new assistant message
    if user_id:
        updated_messages = messages + response["content"]
        save_conversation(user_id, updated_messages)

    print(response)
    return jsonify(response)
