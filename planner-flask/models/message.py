from datetime import datetime
from database import db

class Message(db.Document):
    sender = db.ObjectIdField(required=True)
    timestamp = db.DateTimeField(default=datetime.utcnow)
    message = db.StringField(required=True)
    read = db.BooleanField(default=False)
    read_at = db.DateTimeField()
