
from services.user import UserService
import bcrypt

# Hash the password
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Authenticate the user
def authenticate_user(email, password):
    user = UserService.get_user_by_id(email)
    if user is None:
        return None
    hashed_password = user.password.encode('utf-8')
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return user
    else:
        return None