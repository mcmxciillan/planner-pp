from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

heartbeat_controller = Blueprint('heartbeat_controller', __name__)

@heartbeat_controller.route('/heartbeat', methods=['GET'])
def heartbeat():
    return jsonify({ 'up': True}), 200

# A protected endpoint
@heartbeat_controller.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'message': 'Access granted!'}), 200