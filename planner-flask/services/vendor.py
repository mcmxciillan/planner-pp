from flask import jsonify
from models.vendor import Vendor
from mongoengine import GeoPointField
from models.address import Address
from bson import ObjectId
class VendorService:

    @staticmethod
    def get_all_vendors():
        vendors = Vendor.objects.all()
        return vendors

    @staticmethod
    def create_vendor(data):
        print("Create vendor data", data)
        vendorData = {
            "email": data["email"],
            "name": data["name"],
            "address": {"street": data["address"], "zipcode": data["zipcode"]},
            "vendorType": data["vendorType"],
            "services": [],
            "operator_id": [ObjectId(data['operator_id'])]
        }
        print("Vendor data", vendorData)
        vendor = Vendor(**vendorData)
        vendor.save()
        return vendor
    
    @staticmethod
    def get_venues_by_zipcode(zipcode):
        venues = Vendor.objects(vendorType='venue', address__zipcode=zipcode)
        return venues

    @staticmethod
    def get_vendor(vendor_id):
        vendor = Vendor.objects.get(id=vendor_id)
        print("Vendor found: ", vendor)
        return vendor

    @staticmethod
    def get_vendor_by_operator_id(operator_id):
        vendor = Vendor.objects.get(operator_ids=operator_id)
        return vendor

    @staticmethod
    def update_vendor(vendor_id, data):
        Vendor.objects(_id=vendor_id).update(**data)
        vendor = Vendor.objects.get(id=vendor_id)
        return vendor

    @staticmethod
    def delete_vendor(vendor_id):
        vendor = Vendor.objects.get(id=vendor_id)
        vendor.delete()
        return jsonify(message='Vendor deleted successfully.'), 200

    def find_vendors_by_type(vendor_type, limit=100):
        return Vendor.objects(vendorType=vendor_type)[:limit]
