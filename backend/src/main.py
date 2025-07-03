"""
This script parses the command line for a yaml to help configure the app.
"""
from backend.src.app import app

if __name__ == '__main__':

    app.config['message'] = 'always drink your ovaltine'
    app.run(debug=True)
