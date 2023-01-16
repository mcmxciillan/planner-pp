from flask_mongoengine import MongoEngine

db = MongoEngine()

def init_database(app):
    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb://localhost/planner-pp'
    }
    db.init_app(app)