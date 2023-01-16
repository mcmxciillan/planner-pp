from flask import jsonify, request, make_response
from models.role import ROLES
from models.role import User

def check_duplicate_email():
    # Email
    user = User.objects(email=request.json.get('email')).first()
    if user:
        return make_response(jsonify(message="Failed! Email is already in use!"), 400)

def check_roles_existed():
    if request.json.get('roles'):
        for role in request.json.get('roles'):
            if role not in ROLES:
                return make_response(jsonify(message=f"Failed! Role {role} does not exist!"), 400)