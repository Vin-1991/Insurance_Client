
"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, Flask,send_from_directory,jsonify
from Insurance_Client_App import app
import json
import collections
import time
import os
import datetime

@app.route('/favicon.ico') 
def favicon():
    return send_from_directory('./react_app/dist', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

#@app.route('/')
@app.route('/insurance_client_home')
def insurance_client_home():
    """Renders the home page."""
    return render_template('html/clientdetialsview.html',
        title='Insurance-Client')


@app.route('/insurance_client_dashboard')
def insurance_client_dashboard():
    """Renders the dashboard page."""
    return render_template('html/clientvizview.html',
        title='Insurance-Client')