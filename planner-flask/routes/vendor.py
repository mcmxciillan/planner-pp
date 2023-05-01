from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from services.vendor import VendorService
from services.user import UserService
from bson import ObjectId

vendor_controller = Blueprint('vendor_controller', __name__)

@vendor_controller.route('/vendors/create', methods=['POST'])
def create_vendor():
    """Create a new Vendor"""
    data = request.get_json()
    print(data)
    vendor = VendorService.create_vendor(data)
    print(data["operator_id"])
    if vendor:
        if UserService.add_vendor_role(ObjectId(data["operator_id"])):
            return jsonify(vendor), 201
        else:
            return jsonify(message='Error adding vendor status to user'), 400
    else:
        return jsonify(message='Error creating vendor'), 400

@vendor_controller.route('/vendors', methods=['GET'])
def get_all_vendors():
    """Retrieve all vendors"""
    vendors = VendorService.get_all_vendors()
    if vendors:
        return jsonify(vendors), 200
    else:
        return jsonify(message='Error fetching vendors'), 400

@vendor_controller.route('/venue/<zipcode>')
def get_venues_by_zipcode(zipcode):
    venues = VendorService.get_venues_by_zipcode(zipcode=zipcode)
    if venues:
        return jsonify(venues), 200
    else:
        return jsonify(message='Error fetching venues'), 400

@vendor_controller.route('/vendor/<operator_id>', methods=['GET'])
def get_vendor(operator_id):
    """Retrieve a single vendor by an operator id"""
    vendor = VendorService.get_vendor_by_operator_id(operator_id)
    if vendor:
        return jsonify(vendor), 200
    else:
        return jsonify(message='Error fetching vendor'), 400
    

@vendor_controller.route('/vendor/<id>', methods=['PUT'])
def update_vendor(id):
    """Update a single vendor by id"""
    data = request.get_json()
    vendor = VendorService.update_vendor(id, data)
    if vendor:
        return jsonify(vendor), 200
    else:
        return jsonify(message='Error updating vendor'), 400

@vendor_controller.route('/vendors/<id>', methods=['DELETE'])
def delete_vendor(id):
    """Delete a single vendor by id"""
    vendor = VendorService.delete_vendor(id)
    if vendor:
        return jsonify(message='Vendor deleted'), 200
    else:
        return jsonify(message='Error deleting vendor'), 400

@vendor_controller.route('/search/types', methods=['POST'])
def search_vendors_by_type():
    types = request.json['types']
    vendors_by_type = {}
    for type in types:
        vendors = VendorService.find_vendors_by_type(vendor_type=type)
        vendors_by_type[type] = vendors
    return jsonify(vendors_by_type)
