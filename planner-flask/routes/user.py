from flask import Blueprint, jsonify, request
from services.user import UserService

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/users', methods=['GET'])
def get_users():
    users = UserService.get_all_users()
    if users:
        return jsonify(users), 200 
    else:
        return jsonify(message='Error fetching users'), 400

@user_controller.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        return jsonify(user), 200 
    else:
        return jsonify(message='Error fetching user'), 400

@user_controller.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    user = UserService.create_user(data)
    if user:
        return jsonify(user), 200 
    else:
        return jsonify(message='Error creating user'), 400

@user_controller.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = UserService.update_user(user_id, data)
    if user:
        return jsonify(user), 200  
    else: 
        return jsonify(message='Error updating user'), 400

@user_controller.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    success = UserService.delete_user(user_id)
    if success:
        return jsonify(message='User deleted successfully')
    else: 
        return jsonify(message='Error deleting user'), 400

@user_controller.route("/signup/vendor", methods=["POST"])
def signup_vendor():
    data = request.get_json()
    user_id = data.get("user_id")
    UserService.add_vendor_role(user_id)
    return jsonify({"message": "Vendor role added to user"}), 200