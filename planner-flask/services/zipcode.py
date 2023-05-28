from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.exc import GeocoderTimedOut
import pandas as pd

class ZipcodeService:
    
    @staticmethod
    def get_zipcodes_within_range(base_zipcode, distance):
        # Geocode the base zipcode to obtain its coordinates
        geolocator = Nominatim(user_agent='your_app_name')
        base_location = geolocator.geocode(base_zipcode)

        if not base_location:
            return []

        base_latitude = base_location.latitude
        base_longitude = base_location.longitude

        # Load the ZIP Code database from the CSV file
        zipcodes_df = pd.read_csv('../data/uszips.csv')

        # Calculate the distance between the base location and all zipcodes
        zipcodes_df['distance'] = zipcodes_df.apply(
            lambda row: geodesic((base_latitude, base_longitude), (row['lat'], row['lng'])).miles,
            axis=1
        )

        # Filter the zipcodes within the specified distance range
        zipcodes_within_range = zipcodes_df[zipcodes_df['distance'] <= distance]

        return zipcodes_within_range['zip'].tolist()

    @staticmethod
    def geocode_zipcode(zipcode):
        geolocator = Nominatim(user_agent='your_app_name')
        try:
            location = geolocator.geocode(zipcode, timeout=10)
            if location:
                return location.latitude, location.longitude
            else:
                return None
        except GeocoderTimedOut:
            return None