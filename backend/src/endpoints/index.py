"""
This script is a registry for general endpoints, including the landing page.
"""
from flask import Blueprint, jsonify, request, current_app

index_blueprint = Blueprint('index', __name__)

@index_blueprint.route('/')
def index():
    if request.method == 'GET':
        return jsonify({"message": "Hello from the backend!"})
    else:
        return None

@index_blueprint.route('/healthcheck', methods=['GET'])
def healthcheck():
    if request.method == 'GET':
        return jsonify({'message': current_app.config['message']})
    else:
        return None

@index_blueprint.route('/blog', methods=['GET'])
def blog():
    if request.method == 'GET':
        return jsonify({'message': [
            {'title': 'My first blog', 'content': 'My first blog'},
            {'title': 'My second blog', 'content': 'My second blog'},
        ]})
    else:
        return None

