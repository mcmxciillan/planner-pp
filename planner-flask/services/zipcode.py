from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.exc import GeocoderTimedOut
import pandas as pd

class ZipcodeService:
    
    @staticmethod
    def get_zipcodes_within_range(base_zipcode, distance):
        # Geocode the base zipcode to obtain its coordinates
        geolocator = Nominatim(user_agent='plannette')
        base_location = geolocator.geocode(base_zipcode)
        # split the string into a list
        # city = base_location.split(',')[0]
        # get the city name
        city = base_location.raw['display_name'].split(',')[0]
        if not base_location:
            return []

        base_latitude = base_location.latitude
        base_longitude = base_location.longitude
        # Load the ZIP Code database from the CSV file
        zipcodes_df = pd.read_csv('./data/uszips.csv')

        # Calculate the distance between the base location and all zipcodes
        # zipcodes_df['distance'] = zipcodes_df.apply(
        #     lambda row: geodesic((base_latitude, base_longitude), (row['lat'], row['lng'])).miles,
        #     axis=1
        # )
        # ''' print the distance column of the zipcodes_df dataframe less than 50 miles'''
        # print("What im looking for: ", zipcodes_df[zipcodes_df['distance'] <= distance])
        # Filter the zipcodes within the specified distance range
        # zipcodes_within_range = zipcodes_df[zipcodes_df['distance'] <= distance]
        # print("Zipcodes within range df: ", zipcodes_within_range)
        # Get the list of zipcodes that fall in the same city as the one specified
        zipcodes_within_range = zipcodes_df[zipcodes_df['city'] == city]
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