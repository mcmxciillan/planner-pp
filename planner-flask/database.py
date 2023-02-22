from flask_mongoengine import MongoEngine
from config import config_by_name

db = MongoEngine()

def init_database(app, config_name) -> None:
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
