from flask import Blueprint, jsonify, request, send_from_directory
import os
import glob

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

@content_blueprint.route('/api/discover-markdown/<path:directory>')
def discover_markdown(directory):
    """
    Discover all markdown files in a given directory relative to static/pages/
    Returns a list of relative file paths
    """
    try:
        # Construct the full path to the directory
        static_dir = os.path.join(os.path.dirname(__file__), '..', 'static', 'pages', directory)
        static_dir = os.path.normpath(static_dir)

        # Security check - ensure we're still within the static/pages directory
        pages_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'static', 'pages'))
        if not static_dir.startswith(pages_dir):
            return jsonify({'error': 'Invalid directory path'}), 400

        # Find all markdown files recursively
        markdown_files = []
        pattern = os.path.join(static_dir, '**', '*.md')

        for file_path in glob.glob(pattern, recursive=True):
            # Get relative path from the requested directory
            rel_path = os.path.relpath(file_path, static_dir)
            markdown_files.append(rel_path)

        return jsonify({'files': sorted(markdown_files)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
