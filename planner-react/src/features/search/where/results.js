import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoBackButton from '../../../components/goBackButton';
import { useState } from 'react';
import { setWhere } from '../../../slices/newEventSlice';
import { useSelector } from 'react-redux';
import { selectWhere } from '../../../slices/newEventSlice';

export default function WhereResults() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedVenue, setSelectedVenue] = useState(useSelector(selectWhere).venue)

    function selectVenue(venue) {
        setSelectedVenue(venue)
    }

    function isVenueSelected(venueId) {
        if (selectedVenue !== null)
            return venueId === selectedVenue._id.$oid;
    }

    function removeVenue() {
        setSelectedVenue(null)
    }

    function addVenueToEvent() {
        const whereData = {
            street: selectedVenue.address.street,
            zipcode: selectedVenue.address.zipcode,
            venue: selectedVenue
        }
        dispatch(setWhere(whereData))
        navigate('/events')
    }

    return (
        <div className='mx-2'>
            <GoBackButton />
            <h1 className='text-center text-2xl font-bold'>Venue Results</h1>
            {location.state.length > 0 ? 
                <ul>
                    {location.state.map((venue, i) => (
                        <li key={i} className='border rounded-lg p-2 my-2'>
                            <div>
                                <p className='text-center font-bold'>{venue.name}</p>
                                <p className='text-center'>Rating: {venue.rating}</p>
                                <p className='text-center'>{venue.address.street}, {venue.address.zipcode}</p>
                                <div className="flex justify-center my-4">
                                    {isVenueSelected(venue._id.$oid) ? 
                                        <button className='border-black border py-1 px-2 rounded-full mx-auto bg-pp-green opacity-50' 
                                            onClick={(() => removeVenue())}><span className='font-bold'>&#x2713;</span></button> : 
                                        <button className="border py-1 px-2 rounded-full mx-auto"
                                            onClick={() => selectVenue(venue)}>Add to Event</button>}
                                    <Link className='mx-auto text-center p-2 border rounded-lg' to={`/venue/${venue._id.$oid}`}>Details</Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : <p className='text-center underline'>None found</p>}
            {selectedVenue !== null ? <button className='border-black border py-1 px-2 my-4 rounded-full mx-auto' onClick={(() => addVenueToEvent())}>Add Venue To Event</button>: <></>}
        </div>
    );
}