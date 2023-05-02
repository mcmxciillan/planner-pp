import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoBackButton from '../../../components/goBackButton';
import { useEffect, useState } from 'react';
import { setWho } from '../../../slices/newEventSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';

export default function WhoResults() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [selectedVendors, setSelectedVendors] = useState([])

    function selectVendor(vendorId) {
        setSelectedVendors([...selectedVendors, vendorId])
    }

    function isVendorSelected(vendorId) {
        return selectedVendors.indexOf(vendorId) > -1;
    }

    function removeVendor(vendorId) {
        setSelectedVendors(selectedVendors.filter(selectedIds => selectedIds !== vendorId))
    }

    function addVendorsToEvent() {
        const whoData = {
            organizer: user._id,
            vendors: selectedVendors
        }
        dispatch(setWho(whoData))
        navigate('/events')
    }

    return (
        <div className='mx-2'>
            <GoBackButton />
            <h1 className='text-center text-2xl font-bold'>Results</h1>
            <ul>
                {Object.keys(location.state).map((type, i) =>
                    <li className='my-4' key={i}>
                        <div className='mx-2'>
                            <p className='font-bold text-center'>{type}</p>
                            {location.state[type].length > 0 ? 
                            <ul>
                                {location.state[type].map((vendor, i) => (
                                    <li key={i} className='border rounded-lg p-2 my-2'>
                                        <p className='text-center font-bold'>{vendor.name}</p>
                                        <p className='text-center'>Rating: {vendor.rating}</p>
                                        <p className='text-center'>{vendor.address.street}, {vendor.address.zipcode}</p>
                                        <div className="flex justify-center my-4">
                                            {isVendorSelected(vendor._id.$oid) ? <button className='border-black border py-1 px-2 rounded-full mx-auto bg-pp-green opacity-50' onClick={(() => removeVendor(vendor._id.$oid))}><span className='font-bold'>&#x2713;</span></button> : <button className="border py-1 px-2 rounded-full mx-auto" type='button' onClick={() => selectVendor(vendor._id.$oid)}>Add to Event</button>}
                                        </div>
                                    </li>
                                ))}
                            </ul> : <p className='text-center underline'>None found</p>}
                        </div>                    
                    </li>
                )}
            </ul>
            {selectedVendors.length > 0 ? <button className='border-black border py-1 px-2 my-4 rounded-full mx-auto' onClick={(() => addVendorsToEvent())}>Add Vendors To Event</button>: <></>}
        </div>
    );
}