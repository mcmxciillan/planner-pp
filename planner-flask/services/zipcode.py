from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import pandas as pd

class ZipcodeService:
    
    @staticmethod
    def get_zipcodes_within_range(base_zipcode, distance):
        # Geocode the base zipcode to obtain its coordinates
        geolocator = Nominatim(user_agent='planner-pp')
        base_location = geolocator.geocode(base_zipcode)
        city = base_location.raw['display_name'].split(',')[0]
        if not base_location:
            return []

        # Load the ZIP Code database from the CSV file
        zipcodes_df = pd.read_csv('./data/uszips.csv')

        # Get the list of zipcodes that fall in the same city as the one specified
        zipcodes_within_range = zipcodes_df[zipcodes_df['city'] == city]
        return zipcodes_within_range['zip'].tolist()

    @staticmethod
    def geocode_zipcode(zipcode):
        geolocator = Nominatim(user_agent='planner-pp')
        try:
            location = geolocator.geocode(zipcode, timeout=10)
            if location:
                return location.latitude, location.longitude
            else:
                return None
        except GeocoderTimedOut:
            return None