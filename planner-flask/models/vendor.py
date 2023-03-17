from datetime import datetime
from database import db

class Service(db.EmbeddedDocument):
    """
    The Service class is an embedded document representing a service provided by a Vendor.

    Attributes:
    serviceName (str): The name of the service.
    serviceDescription (str): The description of the service.
    price (float): The price of the service.
    """
    serviceName = db.StringField(required=True)
    serviceDescription = db.StringField(required=True)
    price = db.FloatField(required=True)

class Vendor(db.Document):
    """
    This file defines the Vendor class for a MongoDB collection using the Flask-MongoEngine library.

    The Vendor class is a MongoEngine Document, which represents a MongoDB document and provides a set of fields and methods to interact with the collection.

    The class is defined with the following fields:

    email: a required string field representing the email address of the vendor. It is also set as unique to ensure no duplicates are stored.
    name: a required string field representing the name of the vendor.
    address: a required string field representing the physical street address of the vendor.
    zipcode: string zipcode
    state: string state
    vendorType: a list field containing string fields representing the types of services the vendor provides.
    services: a list field containing embedded documents of the Service class.
    ratings: a list field containing ReferenceFields to Rating documents.
    events: a list field containing ReferenceFields to Event documents.
    operators: a list field containing ReferenceFields to User documents representing the users who have access operate under this Vendor profile
    createdAt: a DateTimeField set to the current UTC time on the creation of a new vendor document.
    updatedAt: a DateTimeField set to the current UTC time on any updates made to the vendor document.
    This file also creates an instance of MongoEngine, which is necessary to initialize the connection to the MongoDB database.
    """
    email = db.StringField(required=True, unique=True)
    name = db.StringField(required=True)
    address = db.StringField(required=True)
    zipcode = db.StringField(required=True)
    state = db.StringField(required=True)
    vendorType = db.StringField(required=True)
    services = db.ListField(db.EmbeddedDocumentField('Service'))
    ratings = db.ListField(db.ReferenceField('Rating'))
    events = db.ListField(db.ReferenceField('Event'))
    operators = db.ListField(db.ReferenceField('User'))
    createdAt = db.DateTimeField(default=datetime.utcnow)
    updatedAt = db.DateTimeField(default=datetime.utcnow)
