from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models.user import User
from datetime import datetime
from services.auth import hash_password, authenticate_user

auth_controller = Blueprint('auth_controller', __name__)


@auth_controller.route('/signup', methods=['POST'])
def signup():
    # Get user data from request body
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if user already exists
    if User.objects(email=email).first():
        return jsonify({'error': 'Email address already in use'}), 400

    # Hash the password
    hashed_password = hash_password(password)

    # Create the new user
    new_user = User(
        firstName=first_name,
        lastName=last_name,
        email=email,
        password=hashed_password,
        roles=["User"],
        createdAt=datetime.utcnow(),
        updatedAt=datetime.utcnow()
    )

    # Save the new user to the database
    new_user.save()

    return jsonify({'message': 'User created successfully', "userData": new_user}), 201


# Create a login endpoint
@auth_controller.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = hash_password(request.json.get('password'))

    # Authenticate user against the database
    user = authenticate_user(email, password)
    if user is None:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Create a JWT token for the user
    access_token = create_access_token(identity=user._id)

    return jsonify({'access_token': access_token}), 200


