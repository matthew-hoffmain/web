from flask import Blueprint, jsonify, request, send_from_directory

content_blueprint = Blueprint('content', __name__, url_prefix='/')

@content_blueprint.route('/download/<path:path>')
def download(path):
    """
    'content' is freely accessible information stored on file on the backend/
    This isn't secure info, it's mostly just web text, images, etc.
    :return:
    """
    if request.method == 'GET':
        return send_from_directory('static', path)
