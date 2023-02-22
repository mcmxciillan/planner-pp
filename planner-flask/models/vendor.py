from datetime import datetime
from database import db

class Service(db.EmbeddedDocument):
    """
    The Service class is an embedded document representing a service provided by a Vendor.

    Attributes:
    serviceName (str): The name of the service.
    price (float): The price of the service.
    """
    serviceName = db.StringField(required=True)
    price = db.FloatField(required=True)

class Vendor(db.Document):
    """
    This file defines the Vendor class for a MongoDB collection using the Flask-MongoEngine library.

    The Vendor class is a MongoEngine Document, which represents a MongoDB document and provides a set of fields and methods to interact with the collection.

    The class is defined with the following fields:

    name: a required string field representing the name of the vendor.
    contact: a required string field representing the contact information of the vendor.
    email: a required string field representing the email address of the vendor. It is also set as unique to ensure no duplicates are stored.
    password: a required string field representing the password for the vendor's account.
    services: a list field containing embedded documents of the Service class.
    vendorType: a list field containing string fields representing the types of services the vendor provides.
    state: string state
    zipcode: string zipcode
    ratings: a list field containing ReferenceFields to Rating documents.
    events: a list field containing ReferenceFields to Event documents.
    createdAt: a DateTimeField set to the current UTC time on the creation of a new vendor document.
    updatedAt: a DateTimeField set to the current UTC time on any updates made to the vendor document.
    This file also creates an instance of MongoEngine, which is necessary to initialize the connection to the MongoDB database.
    """
    name = db.StringField(required=True)
    contact = db.StringField(required=True)
    email = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)
    services = db.ListField(db.EmbeddedDocumentField('Service'))
    vendorType = db.ListField(db.StringField(required=True))
    state = db.StringField(required=True)
    zipcode = db.StringField(required=True)
    ratings = db.ListField(db.ReferenceField('Rating'))
    events = db.ListField(db.ReferenceField('Event'))
    createdAt = db.DateTimeField(default=datetime.utcnow)
    updatedAt = db.DateTimeField(default=datetime.utcnow)
