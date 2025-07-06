"""
This script parses the command line for a yaml to help configure the app.
"""
from backend.src.app import app
from cyforge.blocks.schema import Schema

if __name__ == '__main__':
    # configure Cyforge schema instance, attached to the singleton Flask app
    app.schema = Schema(block_id=0, name="chatbot")
    # TODO: User cookies?

    app.config['message'] = 'always drink your ovaltine'
    app.run(debug=True)
