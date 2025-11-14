from models import Event, User, Vendor

class EventService:
    @staticmethod
    def get_all_events():
        return Event.objects()
    
    @staticmethod
    def get_events_by_organizer_id(organizer_id):
        ''' TODO: Need to return only those events whos date hasn't yet passed '''
        return Event.objects(organizers=organizer_id)
    
    @staticmethod
    def get_events_by_vendor_id(vendor_id):
        ''' TODO: Need to return only those events whos date hasn't yet passed '''
        return Event.objects(vendors=vendor_id)
    
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
    @staticmethod
    def update_event(event_id, update_data):
        event = Event.objects.get(id=event_id)
        for key, value in update_data.items():
            setattr(event, key, value)
        event.save()
        return event

    @staticmethod
    def delete_event(event_id):
        event = Event.objects.get(id=event_id)
        event.delete()
        return True
