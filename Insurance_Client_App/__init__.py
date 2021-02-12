"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__,static_folder = './react_app/dist', template_folder="./react_app")

import Insurance_Client_App.flask_app.views
import Insurance_Client_App.flask_app.apiCalls