import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectVendor } from "../../slices/vendorSlice";

export default function VendorEventsPage() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const vendor = useSelector(selectVendor);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchUserEvents() {
            try {
                const response = await fetch(`http://localhost:5000/events/vendor/${vendor.id}`);
                const data = await response.json();
                console.log("Returning user events data: ", data);
                setEvents(data);
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        }
        fetchUserEvents();
    }, [vendor.id]);

    return(
        <div>
            <button onClick={() => navigate(`/home/${vendor.id}`)}>{`<- Home`}</button>
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
            </ul> : <div className='text-2xl text-center my-6'>No Events to show Yet!</div>}
        </div>
    )
}