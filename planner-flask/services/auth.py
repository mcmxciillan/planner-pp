from services.user import UserService
from flask_bcrypt import generate_password_hash, check_password_hash

# Hash the password
def hash_password(password):
    hashed_password = generate_password_hash(password).decode('utf-8')
    return hashed_password

# Authenticate the user
def authenticate_user(email, password):
    user = UserService.get_user_by_email(email)
    if user is None:
        return None
    if check_password_hash(user.password, password):
        return user
    else:
        return None