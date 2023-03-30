from datetime import datetime
from database import db

class Rating(db.Document):
    """
    Rating class for storing user ratings.

    :param user_id: User ID of the user who left the rating
    :type user_id: ObjectId
    :param vendor_id: Vendor ID of the vendor who was rated
    :type vendor_id: ObjectId
    :param event_id: Event ID of the event that the interaction between the User and the Vendor occured
    :type event_id: ObjectId
    :param rating: Rating score (0.5-5.0)
    :type rating: float
    :param comment: Comment left by the user
    :type comment: str
    :param created_at: Timestamp of when the rating was created
    :type created_at: datetime
    """
    user_id = db.ObjectIdField(required=True)
    vendor_id = db.ObjectIdField(required=True)
    event_id = db.ObjectIdField(required=True)
    rating = db.FloatField(min_value=0.5, max_value=5.0, required=True)
    comment = db.StringField()
    created_at = db.DateTimeField(default=datetime.utcnow)
