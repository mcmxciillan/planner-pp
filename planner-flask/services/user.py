from datetime import datetime
from models.user import User
from models.role import Role

class UserService:

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
            return User.objects.get(id=user_id)
        except Exception as e:
            raise e

    @staticmethod
    def get_user_by_email(user_email):
        """Retrieve a specific user by ID"""
        try:
            return User.objects.get(email=user_email)
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
        try:
            """Sign up a user to be a vendor on the platform."""
            user = User.objects.get(id=user_id)
            vendor_role = Role.objects.get(name="Vendor")
            user.roles.append(vendor_role)
            user.save()
            return True
        except Exception as ex:
            print("Error adding vendor status to user ID: {}, Error: {}".format(user_id, ex))
            return False