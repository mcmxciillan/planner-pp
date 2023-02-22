from flask import Blueprint, jsonify, request
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

@event_controller.route('/event/<event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.objects(_id=event_id).first()
    if event:
        return jsonify(event), 200
    else:
        return jsonify(message='Error fetching event'), 400

# @event_controller.route('/event/<event_id>', methods=['PUT'])
# def update_event(event_id):
#     data = request.get_json()
#     event = EventService.update_event(event_id, data)
#     if event:
#         return jsonify(event), 200
#     else:
#         return jsonify(message='Error updating event'), 400

# @event_controller.route('/event/<event_id>', methods=['DELETE'])
# def delete_event(event_id):
#     event = EventService.delete_event(event_id)
#     if event:
#         return jsonify(message='Event deleted'), 200
#     else:
#         return jsonify(message='Error deleting event'), 400
