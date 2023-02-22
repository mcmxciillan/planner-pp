from flask import Blueprint, jsonify, request
from services.payment import PaymentService

payment_controller = Blueprint('payment_controller', __name__)

@payment_controller.route('/payments')
def get_all_payments():
    payments = PaymentService.get_all_payments()
    if payments:
        return jsonify(payments), 200
    else:
        return jsonify(message='Error fetching payments'), 400

@payment_controller.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    payment = PaymentService.add_payment(data)
    if payment:
        return jsonify(payment), 201
    else:
        return jsonify(message='Error creating payment'), 400

@payment_controller.route('/payments/<id>', methods=['PUT'])
def update_payment(id):
    data = request.get_json()
    payment = PaymentService.update_payment(id, data)
    if payment:
        return jsonify(payment), 200
    else:
        return jsonify(message='Error updating payment'), 400

@payment_controller.route('/payments/<id>', methods=['DELETE'])
def delete_payment(id):
    payment = PaymentService.delete_payment(id)
    if payment:
        return jsonify(payment), 200
    else:
        return jsonify(message='Error deleting payment'), 400