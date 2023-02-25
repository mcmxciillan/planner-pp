from .auth import auth_controller
from .user import user_controller
from .vendor import vendor_controller
from .event import event_controller
from .payment import payment_controller
from .rating import rating_controller
from .heartbeat import heartbeat_controller
from .role import role_controller

routes = [
    auth_controller,
    user_controller,
    vendor_controller,
    event_controller,
    payment_controller,
    rating_controller,
    heartbeat_controller,
    role_controller
]