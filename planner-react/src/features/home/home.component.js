import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';
import { selectVendor, setVendor } from '../../slices/vendorSlice';
import VendorHome from './vendorHome.component';

export default function Home() {
// We need to render vendor home page and functionalities
    const user = useSelector(selectUser);
    const vendor = useSelector(selectVendor);
    const dispatch = useDispatch()
    const { userId } = useParams()

    console.log("User home", user)

    useEffect(() => {
        const fetchVendorData = async () => {
            const response = await fetch(`http://localhost:5000/vendor/${user._id}`)
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
                vendor ? 
                    <div>
                        <VendorHome {...vendor}/>
                    </div> 
                : 
                    <div>
                        <p>{userId}</p>
                        <p>Hello {user.firstName} {user.lastName}!</p>
                        <ul>
                            <li><Link to="/events">Create Event</Link></li>
                            <li><Link to={`/events/${userId}`}>My Events</Link></li>
                        </ul>
                    </div>
            }
        </div>
    );
}