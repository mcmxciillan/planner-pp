from flask import Blueprint, jsonify
from services.user import UserService

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/allAccess')
def all_access():
    return jsonify(message='Public Content.'), 200

@user_controller.route('/userHomeBoard')
def user_home_board():
    return jsonify(message='User-specific content.'), 200

@user_controller.route('/adminBoard')
def admin_board():
    return jsonify(message='Admin Content.'), 200

@user_controller.route('/moderatorBoard')
def moderator_board():
    return jsonify(message='Moderator Content.'), 200

@user_controller.route('/getUsers')
def get_users():
    users = UserService.get_all_users()
    return jsonify(users), 200 if users else jsonify(message='Error fetching users'), 400