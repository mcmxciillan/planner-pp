from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes import routes
from database import init_database
from config import Config

app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY  # Set a secret key for JWT
jwt = JWTManager(app)

init_database(app, 'dev')
CORS(app)

for route in routes:
    app.register_blueprint(route)

if __name__ == '__main__':
    app.run(debug=True)