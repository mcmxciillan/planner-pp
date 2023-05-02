import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const user = useSelector(selectUser);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchUserEvents() {
            try {
                const response = await fetch(`http://localhost:5000/events/user/${user._id}`);
                const data = await response.json();
                console.log("Returning user events data: ", data);
                setEvents(data);
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        }
        fetchUserEvents();
    }, [user._id]);

    return(
        <div>
            <button onClick={() => navigate(`/home/${user._id}`)}>{`<- Home`}</button>
            {dataLoaded && events.length > 0 ? <ul>
                {events.map((ev, i) => (
                    <li className="border rounded-xl w-4/5 mx-auto p-2 my-2 text-center" key={i}>
                        <button>
                            <div>
                                <p className="font-bold">{ev.name}</p>
                                <p>{ev.address.street}</p>
                                <p>{new Date(ev.date.$date).toString()}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul> : 
                <div>
                    <p className="text-center font-bold">No Events to show Yet!</p>
                </div>
            }
        </div>
    )
}