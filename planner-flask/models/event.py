from datetime import datetime
from database import db
from .address import Address

class Event(db.Document):
    """
    Event class for storing event data.

    :param name: Name of the event
    :type name: str
    :param date: Date of the event
    :type date: datetime
    :param description: Description of the event
    :type description: str
    :param organizers: Organizers of the event
    :type organizers: List[ObjectId]
    :param vendors: Vendors of the event
    :type vendors: List[ObjectId]
    :param start_time: Start time of the event
    :type start_time: str
    :param address: Address of the event
    :type address: dict
    :param duration: Duration of the event
    :type duration: int
    :param created_at: Timestamp of when the event was created
    :type created_at: datetime
    """
    name = db.StringField(required=True)
    date = db.DateTimeField(required=True)
    description = db.StringField(required=True)
    organizers = db.ListField(db.ObjectIdField())
    vendors = db.ListField(db.ObjectIdField())
    start_time = db.StringField(required=True)
    address = db.EmbeddedDocumentField(Address)
    duration = db.IntField()
    created_at = db.DateTimeField(default=datetime.utcnow)
