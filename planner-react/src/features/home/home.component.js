import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';
import { selectVendor, setVendor } from '../../slices/vendorSlice';
import VendorHome from './vendorHome.component';

export default function Home() {
    const user = useSelector(selectUser);
    const vendor = useSelector(selectVendor);
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        const fetchVendorData = async () => {
            const response = await fetch(`http://localhost:5000/vendor/operator/${user._id}`)
            const jsonData = await response.json()
            return jsonData
        }
        if (!vendor && user.roles.indexOf('Vendor') > 0) {
            fetchVendorData().then(data => {
                dispatch(setVendor(data))
            })
        }
    }, [vendor, user.roles, user._id, dispatch])

    return (
        <div>
            {
                vendor !== null ? 
                    <div>
                        <VendorHome />
                    </div> 
                : 
                    <div className='block'>
                        <p className='text-2xl text-center my-6'>Hello {user.firstName}!</p>
                        <div className='my-4 w-4/5 h-10 mx-auto'>
                            <Link to="/events" className='text-center block border py-1 px-2 rounded-full w-100 h-10 mx-auto'>Create Event</Link>
                        </div>
                        <div className='my-4 w-4/5 h-10 mx-auto'>
                            <Link to={`/events/user/${userId}`} className='text-center block border py-1 px-2 rounded-full w-100 h-10 mx-auto'>My Events</Link>
                        </div>
                    </div>
            }
        </div>
    );
}