import jwt
from flask import jsonify
from models.user import User
from models.role import Role
from config import app_config

def verify_token(req, res, next):
    token = req.headers.get("x-access-token")

    if not token:
        return jsonify({"message": "No token provided!"}), 403

    try:
        decoded = jwt.decode(token, app_config["AUTH_SECRET"])
    except jwt.DecodeError:
        return jsonify({"message": "Invalid token"}), 401

    req.user_id = decoded["id"]
    next()

def is_admin(req, res, next):
    user = User.objects(id=req.user_id).first()
    roles = Role.objects(id__in=user.roles)
    for role in roles:
        if role.name == "admin":
            next()
            return
    return jsonify({"message": "Require Admin Role!"}), 403

def is_moderator(req, res, next):
    user = User.objects(id=req.user_id).first()
    roles = Role.objects(id__in=user.roles)
    for role in roles:
        if role.name == "moderator":
            next()
            return
    return jsonify({"message": "Require Moderator Role!"}), 403
