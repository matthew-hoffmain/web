import json
import os
from datetime import datetime
from typing import List, Dict, Optional

CONVERSATIONS_DIR = 'static/conversations'

def ensure_conversations_dir():
    """Ensure the conversations directory exists."""
    if not os.path.exists(CONVERSATIONS_DIR):
        os.makedirs(CONVERSATIONS_DIR)

def get_conversation_file_path(user_id: str) -> str:
    """Get the file path for a user's conversation."""
    ensure_conversations_dir()
    return os.path.join(CONVERSATIONS_DIR, f"{user_id}.json")

def save_conversation(user_id: str, messages: List[Dict]) -> None:
    """Save a conversation for a user."""
    file_path = get_conversation_file_path(user_id)
    conversation_data = {
        'user_id': user_id,
        'messages': messages,
        'last_updated': datetime.utcnow().isoformat()
    }

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(conversation_data, f, indent=2, ensure_ascii=False)

def load_conversation(user_id: str) -> Optional[List[Dict]]:
    """Load a conversation for a user."""
    file_path = get_conversation_file_path(user_id)

    if not os.path.exists(file_path):
        return None

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            conversation_data = json.load(f)
            return conversation_data.get('messages', [])
    except (json.JSONDecodeError, IOError):
        return None

def clear_conversation(user_id: str) -> None:
    """Clear a user's conversation."""
    file_path = get_conversation_file_path(user_id)
    if os.path.exists(file_path):
        os.remove(file_path)
