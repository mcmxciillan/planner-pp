import json
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
        return payment

    @staticmethod
    def update_payment(payment_id, data):
        payment = Payment.objects.get(id=ObjectId(payment_id))
        payment.update(**data)
        return payment

    @staticmethod
    def delete_payment(payment_id):
        payment = Payment.objects.get(id=ObjectId(payment_id))
        payment.delete()
        return True

    @staticmethod
    def process_payment(data):
        return True
