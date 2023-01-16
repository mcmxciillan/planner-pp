from datetime import datetime
from flask_mongoengine import MongoEngine
from .user import User
from .vendor import Vendor

db = MongoEngine()

class Rating(db.Document):
    rating = db.IntField(required=True)
    review = db.StringField()
    ratedEntity = db.ReferenceField(User, Vendor)
    ratingParty = db.StringField()
    ratedPartyType = db.StringField(required=True)
    createdAt = db.DateTimeField(default=datetime.utcnow)
    updatedAt = db.DateTimeField(default=datetime.utcnow)