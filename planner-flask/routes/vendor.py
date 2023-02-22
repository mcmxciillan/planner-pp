from flask import Blueprint, jsonify, request
from services.vendor import VendorService

vendor_controller = Blueprint('vendor_controller', __name__)

@vendor_controller.route('/vendors/create', methods=['POST'])
def create_vendor():
    """Create a new Vendor"""
    data = request.get_json()
    vendor = VendorService.create_vendor(data)
    if vendor:
        return jsonify(vendor), 201
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

@vendor_controller.route('/vendor/<id>', methods=['GET'])
def get_vendor(id):
    """Retrieve a single vendor by id"""
    vendor = VendorService.get_vendor(id)
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

@vendor_controller.route('/search', methods=['GET'])
def search_vendor():
    search_params = request.args.to_dict()
    vendors = VendorService.search(search_params)
    return jsonify(vendors)
