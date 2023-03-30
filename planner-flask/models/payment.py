from datetime import datetime
from database import db

class Payment(db.Document):
    """
    Payment class representing a payment made by a user to a vendor for a specific event.
    
    :param amount: The amount paid in the payment
    :type amount: int
    :param date: The date and time the payment was made
    :type date: datetime
    :param user: The user that made the payment
    :type user: ObjectIdField(User)
    :param vendor: The vendor that received the payment
    :type vendor: ObjectIdField(Vendor)
    :param event: The event the payment is for
    :type event: ObjectIdField(Event)
    """
    user_id = db.ObjectIdField(required=True)
    vendor_id = db.ObjectIdField(required=True)
    event = db.ObjectIdField(required=True)
    amount = db.FloatField(min_value=0.0, max_value=999999.99,required=True)
    date = db.DateTimeField(default=datetime.utcnow, required=True)
