from flask import Blueprint, jsonify

heartbeat_controller = Blueprint('heartbeat_controller', __name__)

@heartbeat_controller.route('/heartbeat', methods=['GET'])
def heartbeat():
    return jsonify({ 'up': True}), 200
