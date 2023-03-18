from datetime import datetime
from .role import Role
from .event import Event
from .rating import Rating
from database import db

class User(db.Document):
    """
    This is the User class for the application. It is used to represent a user in the database using MongoEngine.

    The class is defined with the following fields:

    firstName (str): The first name of the user.
    lastName (str): The last name of the user.
    email (str): The email address of the user.
    password (str): The hashed password of the user.
    events (List[ObjectId]): A list of events that the user is associated with.
    roles (List[ObjectId]): A list of roles that the user has.
    ratings: a list field containing ReferenceFields to Rating documents.
    events: a list field containing ReferenceFields to Event documents.
    createdAt (datetime): The date and time when the user was created.
    updatedAt (datetime): The date and time when the user was last updated.
    """
    firstName = db.StringField(required=True)
    lastName = db.StringField(required=True)
    email = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    events = db.ListField(db.ReferenceField(Event))
    roles = db.ListField(db.ReferenceField(Role))
    ratings = db.ListField(db.ReferenceField(Rating))
    createdAt = db.DateTimeField(default=datetime.utcnow)
    updatedAt = db.DateTimeField(default=datetime.utcnow)
