from flask import Flask
from flask_cors import CORS
from routes.user import user_controller
from routes.vendor import vendor_controller
from routes.event import event_controller
from routes.payment import payment_controller
from routes.rating import rating_controller
from database import init_database

app = Flask(__name__)
init_database(app)
CORS(app)

app.register_blueprint(user_controller)
app.register_blueprint(vendor_controller)
app.register_blueprint(event_controller)
app.register_blueprint(payment_controller)
app.register_blueprint(rating_controller)

if __name__ == '__main__':
    app.run(debug=True)