from datetime import datetime
from models.user import User

class UserService:

    @staticmethod
    def create_user(user_data):
        """Create a new user in the database"""
        try:
            user = User(**user_data)
            user.created_at = datetime.utcnow()
            user.save()
            return user
        except Exception as e:
            raise e

    @staticmethod
    def get_all_users():
        """Retrieve all users from the database"""
        try:
            return User.objects()
        except Exception as e:
            raise e

    @staticmethod
    def get_user_by_id(user_id):
        """Retrieve a specific user by ID"""
        try:
            return User.objects.get(_id=user_id)
        except Exception as e:
            raise e

    @staticmethod
    def get_user_by_emial(user_emial):
        """Retrieve a specific user by ID"""
        try:
            return User.objects.get(email=user_emial)
        except Exception as e:
            raise e

    @staticmethod
    def update_user(user_id, update_data):
        """Update a user's information in the database"""
        try:
            user = User.objects.get(_id=user_id)
            for key, value in update_data.items():
                setattr(user, key, value)
            user.updated_at = datetime.utcnow()
            user.save()
            return user
        except Exception as e:
            raise e

    @staticmethod
    def delete_user(user_id):
        """Delete a user from the database"""
        try:
            user = User.objects.get(_id=user_id)
            user.delete()
            return True
        except Exception as e:
            raise e

    @staticmethod
    def add_vendor_role(user_id):
        """Sign up a user to be a vendor on the platform."""
        user = User.objects.get(_id=user_id)
        user.roles.append("Vendor")
        user.save()