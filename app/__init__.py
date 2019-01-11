from flask import Flask, Blueprint
from flask_jwt_extended import(JWTManager, jwt_required, create_access_token)
from .api.v1 import version_one as v1
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(v1)
    app.config['JWT_SECRET_KEY'] = os.getenv('SECRET')
    jwt = JWTManager(app)    
    return app