from datetime import datetime
from models import Event, User, Vendor

class EventService:
    @staticmethod
    def get_all_events():
        return Event.objects()
    
    @staticmethod
    def get_event_by_id(event_id: str):
        return Event.objects(_id=event_id).first()
    
    @staticmethod
    def add_event(event: dict):
        new_event = Event(**event)
        new_event.save()
        return new_event
    
    @staticmethod
    def add_organizer(event_id: str, organizer_id: str):
        event = Event.objects(_id=event_id).first()
        organizer = User.objects(_id=organizer_id).first()
        if event and organizer:
            event.update(add_to_set__organizers=organizer)
            return True
        else:
            return False
    
    @staticmethod
    def remove_organizer(event_id: str, organizer_id: str):
        event = Event.objects(_id=event_id).first()
        organizer = User.objects(_id=organizer_id).first()
        if event and organizer:
            event.update(pull__organizers=organizer)
            return True
        else:
            return False
    
    @staticmethod
    def add_vendor(event_id: str, vendor_id: str):
        event = Event.objects(_id=event_id).first()
        vendor = Vendor.objects(_id=vendor_id).first()
        if event and vendor:
            event.update(add_to_set__vendors=vendor)
            return True
        else:
            return False
    
    @staticmethod
    def remove_vendor(event_id: str, vendor_id: str):
        event = Event.objects(_id=event_id).first()
        vendor = Vendor.objects(_id=vendor_id).first()
        if event and vendor:
            event.update(pull__vendors=vendor)
            return True
        else:
            return False
    @staticmethod
    def update_event(event_id, update_data):
        """Update an event's information in the database"""
        try:
            event = Event.objects.get(_id=event_id)
            for key, value in update_data.items():
                setattr(event, key, value)
            event.updated_at = datetime.utcnow()
            event.save()
            return event
        except Exception as e:
            raise e

    @staticmethod
    def delete_event(event_id):
        """Delete a event from the database"""
        try:
            event = Event.objects.get(_id=event_id)
            event.delete()
            return True
        except Exception as e:
            raise e
