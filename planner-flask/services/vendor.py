from flask import jsonify
from models import Vendor
from mongoengine import GeoPointField

class VendorService:

    @staticmethod
    def get_all_vendors():
        vendors = Vendor.objects.all()
        return vendors

    @staticmethod
    def create_vendor(data):
        vendor = Vendor(**data)
        vendor.save()
        return vendor

    @staticmethod
    def get_vendor(vendor_id):
        vendor = Vendor.objects.get(id=vendor_id)
        return vendor

    @staticmethod
    def update_vendor(vendor_id, data):
        Vendor.objects(id=vendor_id).update(**data)
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
        if 'rating' in search_criteria:
            vendors = vendors.filter(rating__gte=search_criteria['rating'])
        if 'state' in search_criteria:
            vendors = vendors.filter(state=search_criteria['state'])
        if 'zipcode' in search_criteria:
            vendors = vendors.filter(zipcode=search_criteria['zipcode'])
            search_location = GeoPointField().to_python(search_criteria['zipcode'])
        if 'distance' in search_criteria:
            distance = search_criteria['distance']
            vendors = vendors.filter(location__geo_within_center=[search_location, distance])
        
        return vendors
