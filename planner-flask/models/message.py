from datetime import datetime
from database import db

class Message(db.Document):
    """
    Message class for storing messages between users.
    
    :param sender: User ID of the user who sent the message
    :type sender: ObjectId
    :param timestamp: Timestamp of when the message was sent
    :type timestamp: datetime
    :param message: Content of the message
    :type message: str
    :param read: Whether the message has been read
    :type read: bool
    :param read_at: Timestamp of when the message was read
    :type read_at: datetime
    """
    sender = db.ObjectIdField(required=True)
    timestamp = db.DateTimeField(default=datetime.utcnow)
    message = db.StringField(required=True)
    read = db.BooleanField(default=False)
    read_at = db.DateTimeField()
