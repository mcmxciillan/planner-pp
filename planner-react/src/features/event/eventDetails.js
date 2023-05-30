import { Link, useParams } from "react-router-dom"
import GoBackButton from "../../components/goBackButton"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectVendor } from "../../slices/vendorSlice";
import { selectUser } from "../../slices/userSlice";

export default function EventDetails() {
    const {eventId} = useParams();
    const [event, setEvent] = useState(null)
    const [eventOrganizers, setEventOrganizers] = useState([])
    const [eventVendors, setEventVendors] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const vendor = useSelector(selectVendor);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function fetchEventDetails() {
            const response = await fetch(`http://localhost:5000/event/${eventId}`)
            const data = await response.json()
            setEvent(data)
            setIsLoading(false)
        }
        fetchEventDetails()
    }, [eventId])

    useEffect(() => {
        if (!isLoading) {
            event.organizers.forEach(async organizer => {
                const response = await fetch(`http://localhost:5000/eventOrganizer/${organizer.$oid}`)
                const data = await response.json()
                setEventOrganizers(prev => [...prev, data])
            })
            event.vendors.forEach(async vendor => {
                const response = await fetch(`http://localhost:5000/vendor/${vendor.$oid}`)
                const data = await response.json()
                setEventVendors(prev => [...prev, data])
            })
        }
    }, [event, isLoading])

    if (isLoading) return (
        "Loading..."
    )

    return (
        <div>
            <GoBackButton />
            <div className="text-center">
                <Link className="float-right text-center p-2 border rounded-lg" to={`/event/${eventId}/edit`}>Edit Event</Link>
                <p className="font-bold text-xl underline">{event.name}</p>
                <p>{event.description}</p>
                <p className="text-xs mb-2">{event.address.street}, {event.address.zipcode}</p>
                <p>Event Date: {new Date(event.date.$date).toString()}</p>
                <p>Starts @ {event.start_time}</p>
                <p>Duration: {event.duration / 60} hours</p>
                {
                    <div className="my-4">
                        <p className="font-bold text-center">Organizers</p>
                        <ul className="grid">
                            <Link className="mx-auto text-center p-2 border rounded-lg" to={`message/organizers`}>Message all Organizers</Link>
                            {eventOrganizers.map((o, i) => (
                                <li className="grid border rounded-xl w-4/5 mx-auto p-2 my-2 text-center" key={i}>
                                    <p>{o.firstName} {o.lastName}</p>
                                    <p>{o.email}</p>
                                    {user._id !== o._id.$oid && <Link className="mx-auto text-center p-2 border rounded-lg" to={`message/organizer/${o._id.$oid}`}>Message</Link>}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <div className="my-4">
                    <p className="font-bold text-center">Vendors</p>
                    <ul className="grid">
                        <Link className="mx-auto text-center p-2 border rounded-lg" to={`message/vendors`}>Message all Vendors</Link>
                        {eventVendors.map((v, i) => (
                            <li className="grid border rounded-xl w-4/5 mx-auto p-2 my-2 text-center" key={i}>
                                <p>{v.name}</p>
                                <p>{v.vendorType}</p>
                                <Link className="mx-auto text-center p-2 border rounded-lg" to={`message/vendor/${v._id.$oid}`}>Message</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}