from flask_mongoengine import MongoEngine
from datetime import datetime

db = MongoEngine()

class Address(db.EmbeddedDocument):
    """
    The Address embedded document class for the Event model.
    This class defines the fields for the address of an event.
    """
    street = db.StringField(required=True)
    zipcode = db.StringField(required=True)
    state = db.StringField(required=True)

class Event(db.Document):
    """
    Event class for storing event data.

    :param name: Name of the event
    :type name: str
    :param date: Date of the event
    :type date: datetime
    :param location: Location of the event
    :type location: str
    :param description: Description of the event
    :type description: str
    :param organizers: Organizers of the event
    :type organizers: List[ObjectId]
    :param vendors: Vendors of the event
    :type vendors: List[ObjectId]
    :param start_date: Start date of the event
    :type start_date: datetime
    :param start_time: Start time of the event
    :type start_time: str
    :param address: Address of the event
    :type address: dict
    :param duration: Duration of the event
    :type duration: int
    :param budget: Budget of the event
    :type budget: int
    :param attendees: Attendees of the event
    :type attendees: List[ObjectId]
    :param created_at: Timestamp of when the event was created
    :type created_at: datetime
    :param updated_at: Timestamp of when the event was last updated
    :type updated_at: datetime
    """
    name = db.StringField(required=True)
    date = db.DateTimeField(required=True)
    location = db.StringField(required=True)
    description = db.StringField(required=True)
    organizers = db.ListField(db.ObjectIdField())
    vendors = db.ListField(db.ObjectIdField())
    start_date = db.DateTimeField(required=True)
    start_time = db.StringField(required=True)
    address = db.EmbeddedDocumentField('Address')
    duration = db.IntField(required=True)
    budget = db.IntField()
    attendees = db.ListField(db.ObjectIdField())
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)