from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Event
from services.event import EventService

event_controller = Blueprint('event_controller', __name__)

@event_controller.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = EventService.add_event(data)
    if event:
        return jsonify(event), 200
    else:
        return jsonify(message='Error creating event'), 400

@event_controller.route('/events', methods=['GET'])
def get_events():
    events = Event.objects()
    return jsonify(events), 200

@event_controller.route('/events/user/<organizer_id>', methods=['GET'])
def get_user_events(organizer_id):
    """Retrieve events by operator id"""
    events = EventService.get_events_by_organizer_id(organizer_id)
    if events:
        return jsonify(events), 200
    else:
        return jsonify(message='Error fetching events'), 400

@event_controller.route('/events/vendor/<vendor_id>', methods=['GET'])
def get_vendor_events(operator_id):
    """Retrieve events by a vendor id"""
    events = EventService.get_events_by_vendor_id(operator_id)
    if events:
        return jsonify(events), 200
    else:
        return jsonify(message='Error fetching vendor'), 400

@event_controller.route('/event/<event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.objects(_id=event_id).first()
    if event:
        return jsonify(event), 200
    else:
        return jsonify(message='Error fetching event'), 400

@event_controller.route('/event/<event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.get_json()
    event = EventService.update_event(event_id, data)
    if event:
        return jsonify(event), 200
    else:
        return jsonify(message='Error updating event'), 400

@event_controller.route('/event/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = EventService.delete_event(event_id)
    if event:
        return jsonify(message='Event deleted'), 200
    else:
        return jsonify(message='Error deleting event'), 400
