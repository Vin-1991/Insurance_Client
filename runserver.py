"""
This script runs the application using a development server.
It contains the definition of routes and views for the application.
"""

from os import environ
from Insurance_Client_App import app

if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    HOST = environ.get('SERVER_HOST', 'localhost')
    try:
        PORT = int(environ.get('SERVER_PORT', '4000'))
    except ValueError:
        PORT = 4000
    app.run(HOST, PORT,debug=True,use_reloader=True)
    #app.run(HOST, PORT)