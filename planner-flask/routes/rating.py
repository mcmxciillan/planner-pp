from flask import Blueprint, jsonify, request
from services.rating import RatingService

rating_controller = Blueprint('rating_controller', __name__)

@rating_controller.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = RatingService.get_all_ratings()
    if ratings:
        return jsonify(ratings), 200
    else:
        return jsonify(message='Error fetching ratings'), 400

@rating_controller.route('/rating/<rating_id>', methods=['GET'])
def get_rating(rating_id):
    rating = RatingService.get_rating_by_id(rating_id)
    if not rating:
        return jsonify({"message": "Rating not found"}), 404
    return jsonify(rating.to_dict()), 200

@rating_controller.route('/rating', methods=['POST'])
def add_rating():
    data = request.get_json()
    rating = RatingService.create_rating(data)
    if rating:
        return jsonify(rating), 201
    else:
        return jsonify(message='Error adding rating'), 400

@rating_controller.route('/rating/<rating_id>', methods=['PUT'])
def update_rating(rating_id):
    data = request.get_json()
    rating = RatingService.update_rating(rating_id, data)
    if rating:
        return jsonify(rating), 200
    else:
        return jsonify(message='Error updating rating'), 400

@rating_controller.route('/rating/<rating_id>', methods=['DELETE'])
def delete_rating(rating_id):
    rating = RatingService.delete_rating(rating_id)
    if rating:
        return jsonify(rating), 200
    else:
        return jsonify(message='Error deleting rating'), 400
