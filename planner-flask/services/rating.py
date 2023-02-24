from models import Rating

class RatingService:

    @staticmethod
    def create_rating(data):
        rating = Rating(**data)
        rating.save()
        return rating
    
    @staticmethod
    def get_all_ratings():
        ratings = Rating.objects.all()
        return ratings
    
    @staticmethod
    def get_rating_by_id(rating_id):
        rating = Rating.objects.get(id=rating_id)
        return rating
    
    @staticmethod
    def update_rating(rating_id, data):
        rating = Rating.objects.get(id=rating_id)
        rating.update(**data)
        return rating
    
    @staticmethod
    def delete_rating(rating_id):
        rating = Rating.objects.get(id=rating_id)
        rating.delete()
        return True