import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectVendor } from "../../slices/vendorSlice";
import { fetchVendorEvents, selectEvents } from "../../slices/eventsSlice";
import { useDispatch } from "react-redux";

export default function VendorEventsPage() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const vendor = useSelector(selectVendor);
    const navigate = useNavigate();
    const events = useSelector(selectEvents);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            dispatch(fetchVendorEvents(vendor.id));
            await setDataLoaded(true);
        }
        loadData();
    }, [vendor.id, dispatch, events]);

    return(
        <div>
            <button onClick={() => navigate(`/home/${vendor.id}`)}>{`<- Home`}</button>
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
            </ul> : <div className='text-2xl text-center my-6'>No Events to show Yet!</div>}
        </div>
    )
}