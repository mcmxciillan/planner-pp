import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserEvents, selectEvents } from "../../slices/eventsSlice";
import { useDispatch } from "react-redux";

export default function EventsPage() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const events = useSelector(selectEvents);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            dispatch(fetchUserEvents(user._id));
            setDataLoaded(true);
        }
        loadData();
    }, [user._id, dispatch]);

    return(
        <div>
            <button onClick={() => navigate(`/home/${user._id}`)}>{`<- Home`}</button>
            {dataLoaded && events.length > 0 ? <ul>
                {events.map((ev, i) => (
                    <li className="border rounded-xl w-4/5 mx-auto p-2 my-2 text-center" key={i}>
                        <Link to={`/event/${ev._id.$oid}`}>
                            <div>
                                <p className="font-bold">{ev.name}</p>
                                <p>{ev.address.street}</p>
                                <p>{new Date(ev.date.$date).toString()}</p>
                            </div>
                        </Link>
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