import json
from flask import jsonify
from bson.objectid import ObjectId
from models.payment import Payment

class PaymentService:
    @staticmethod
    def get_all_payments():
        payments = Payment.objects().to_json()
        return json.loads(payments)

    @staticmethod
    def get_payment_by_id(payment_id):
        payment = Payment.objects.get(id=ObjectId(payment_id)).to_json()
        return json.loads(payment)

    @staticmethod
    def add_payment(data):
        payment = Payment(**data)
        payment.save()
        return jsonify(message='Payment added successfully'), 200

    @staticmethod
    def update_payment(payment_id, data):
        Payment.objects.get(id=ObjectId(payment_id)).update(**data)
        return jsonify(message='Payment updated successfully'), 200

    @staticmethod
    def delete_payment(payment_id):
        Payment.objects.get(id=ObjectId(payment_id)).delete()
        return jsonify(message='Payment deleted successfully'), 200

    @staticmethod
    def process_payment(data):
        print("Payment info {}".format(data))
        return True
