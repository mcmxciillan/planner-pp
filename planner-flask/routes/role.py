from flask import Blueprint, jsonify, request
from models.role import Role
from database import db

role_controller = Blueprint('role_controller', __name__)

@role_controller.route('/role', methods=['POST'])
def add_role():
    """Create a new role in the database"""
    data = request.get_json()
    role = Role(**data)
    role.save()
    if role:
        return jsonify(role), 200 
    else:
        return jsonify(message='Error creating role'), 400