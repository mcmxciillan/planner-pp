from flask_mongoengine import MongoEngine
from datetime import datetime

db = MongoEngine()

class Payment(db.Document):
    """
    Payment class representing a payment made by a user to a vendor for a specific event.
    
    :param amount: The amount paid in the payment
    :type amount: int
    :param date: The date and time the payment was made
    :type date: datetime
    :param user: The user that made the payment
    :type user: ReferenceField(User)
    :param vendor: The vendor that received the payment
    :type vendor: ReferenceField(Vendor)
    :param event: The event the payment is for
    :type event: ReferenceField(Event)
    """
    amount = db.IntField(required=True)
    date = db.DateTimeField(default=datetime.utcnow, required=True)
    user = db.ReferenceField("User", required=True)
    vendor = db.ReferenceField("Vendor", required=True)
    event = db.ReferenceField("Event", required=True)