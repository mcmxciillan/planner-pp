from database import db

class Role(db.Document):
    """
    The Role class defines the different types of roles that a user can have in the system.

    Attributes:
    name (str): The name of the role. Can either be 'User', 'Vendor', or 'Admin'.
    """
    name = db.StringField(primary_key=True, required=True)
