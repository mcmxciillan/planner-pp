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
        vendorData = {
            "email": data["email"],
            "name": data["name"],
            "address": {"street": data["address"], "zipcode": data["zipcode"]},
            "vendorType": data["vendorType"],
            "services": [],
            "operator_ids": [ObjectId(data['operator_id'])]
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

    def search(self, search_criteria):
        vendors = Vendor.objects()
        if 'vendorType' in search_criteria:
            vendors = vendors.filter(vendorType__in=search_criteria['vendorType'])
        if 'zipcode' in search_criteria:
            vendors = vendors.filter(zipcode=search_criteria['zipcode'])
            search_location = GeoPointField().to_python(search_criteria['zipcode'])
        if 'distance' in search_criteria:
            distance = search_criteria['distance']
            vendors = vendors.filter(location__geo_within_center=[search_location, distance])
        
        return vendors
