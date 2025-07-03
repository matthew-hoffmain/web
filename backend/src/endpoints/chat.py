
from flask import Blueprint, jsonify, request

chat_blueprint = Blueprint('chat', __name__, url_prefix='/chat')

@chat_blueprint.route('/init')
def init():
    if request.method == 'GET':
        return jsonify({"content":
                        [
                            {
                                "id": 0,
                                "sender": "VIRGIl",
                                "content": "Hello and welcome! I am Matt's personal AI assistant."
                            },
                            {
                                "id": 1,
                                "sender": "VIRGIL",
                                "content": "Matt has been recording all of his conversations with his AI models since 2023, a year after he graduated from Northeastern. In 2024 he independently created Cyforge. I live on a Jetson Xavier board and run on Ubuntu 22.04 LTS."
                            },
                            {
                                "id": 2,
                                "sender": "VIRGIL",
                                "content": "My full name is Virgil Ubuntu Xavier.\n"
                                           "- Matt named me Virgil after the poet featured in the Divine Comedy, since I 'have a way with words'.\n"
                                           "- Ubuntu is the Linux Operating System I run on, and Xavier is the 'family' of hardware that I currently reside in ('NVIDIA Jetson Xavier NX'). This was a leftover from his capstone project. All of these are obviously reconfigurable,"
                                           "so my name is really just to mark which iteration of the 'assistant AI' Matt is currently using.\n"
                                           "- Coincidentally, Matt's middle name is Francis, named after his grandfather Francis Xavier. Together, we all take after Saint Francis Xavier! The same goes for Professor X (Charles Francis Xavier)!"
                            }
                        ]}
        )
    else:
        return None