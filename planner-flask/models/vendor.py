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
    vendorType: a list field containing string fields representing the types of services the vendor provides.
    services: a list field containing embedded documents of the Service class.
    rating: a Float field containing the rating of the Vendor (0.5-5.0)
    operator_ids: a list field containing ObjectId's referencing User documents representing the users who have access operate under this Vendor profile
    createdAt: a DateTimeField set to the current UTC time on the creation of a new vendor document.
    """
    email = db.StringField(required=True, unique=True)
    name = db.StringField(required=True)
    address = db.StringField(required=True)
    zipcode = db.StringField(required=True)
    vendorType = db.StringField(required=True)
    services = db.ListField(db.EmbeddedDocumentField(Service))
    rating = db.FloatField(min_value=0.5, max_value=5.0)
    operator_ids = db.ListField(db.ObjectIdField())
    createdAt = db.DateTimeField(default=datetime.utcnow)
