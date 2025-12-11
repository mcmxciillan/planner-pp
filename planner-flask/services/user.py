from models.user import User
from models.role import Role

class UserService:

    @staticmethod
    def get_all_users():
        """Retrieve all users from the database"""
        return User.objects()

    @staticmethod
    def get_user_by_id(user_id):
        """Retrieve a specific user by ID"""
        return User.objects.get(id=user_id)

    @staticmethod
    def get_user_by_email(user_email):
        """Retrieve a specific user by email"""
        return User.objects.get(email=user_email)

    @staticmethod
    def update_user(user_id, update_data):
        """Update a user's information in the database"""
        user = User.objects.get(id=user_id)
        for key, value in update_data.items():
            setattr(user, key, value)
        user.save()
        return user

    @staticmethod
    def delete_user(user_id):
        """Delete a user from the database"""
        user = User.objects.get(id=user_id)
        user.delete()
        return True

    @staticmethod
    def add_vendor_role(user_id):
        """Sign up a user to be a vendor on the platform."""
        user = User.objects.get(id=user_id)
        vendor_role = Role.objects.get(name="Vendor")
        user.roles.append(vendor_role)
        user.save()
        return True