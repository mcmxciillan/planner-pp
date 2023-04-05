from database import db

class Address(db.EmbeddedDocument):
    """
    The Address embedded document class for the Event model.
    This class defines the fields for the address of an event.
    """
    street = db.StringField(required=True)
    zipcode = db.StringField(required=True)