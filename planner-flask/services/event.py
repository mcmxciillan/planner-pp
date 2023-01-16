from flask_mongoengine import MongoEngine
from models import Event, User, Vendor

db = MongoEngine()

class EventService:
    @staticmethod
    def get_all_events():
        return Event.objects()
    
    @staticmethod
    def get_event_by_id(event_id: str):
        return Event.objects(id=event_id).first()
    
    @staticmethod
    def add_event(event: dict):
        new_event = Event(**event)
        new_event.save()
        return new_event
    
    @staticmethod
    def add_organizer(event_id: str, organizer_id: str):
        event = Event.objects(id=event_id).first()
        organizer = User.objects(id=organizer_id).first()
        if event and organizer:
            event.update(add_to_set__organizers=organizer)
            return True
        else:
            return False
    
    @staticmethod
    def remove_organizer(event_id: str, organizer_id: str):
        event = Event.objects(id=event_id).first()
        organizer = User.objects(id=organizer_id).first()
        if event and organizer:
            event.update(pull__organizers=organizer)
            return True
        else:
            return False
    
    @staticmethod
    def add_vendor(event_id: str, vendor_id: str):
        event = Event.objects(id=event_id).first()
        vendor = Vendor.objects(id=vendor_id).first()
        if event and vendor:
            event.update(add_to_set__vendors=vendor)
            return True
        else:
            return False
    
    @staticmethod
    def remove_vendor(event_id: str, vendor_id: str):
        event = Event.objects(id=event_id).first()
        vendor = Vendor.objects(id=vendor_id).first()
        if event and vendor:
            event.update(pull__vendors=vendor)
            return True
        else:
            return False