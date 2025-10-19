"""
This script parses the command line for a ini to help configure the app.
"""
from backend.src.app import app
import argparse
import os
import configparser

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start the Flask app with an INI config.')
    parser.add_argument('--config', type=str, default='default.ini',
                        help='INI config filename in the configs directory (e.g., myconfig.ini)')
    args = parser.parse_args()

    config_path = os.path.join(os.path.dirname(__file__), '..', 'configs', args.config)
    config_path = os.path.abspath(config_path)
    if os.path.exists(config_path):
        config = configparser.ConfigParser()
        try:
            config.read(config_path)
            # Use DEFAULT section and flatten all sections into app.config
            for section in config.sections():
                for key, value in config.items(section):
                    app.config[f"{section}.{key}"] = value
            # Also add DEFAULT section (if any)
            for key, value in config.defaults().items():
                app.config[key] = value
        except Exception as e:
            print(f"Error parsing INI file {args.config}: {e}")
    else:
        print(f"Config file {config_path} not found. Using default config.")

    app.config['message'] = 'always drink your ovaltine'
    app.run(debug=True)
