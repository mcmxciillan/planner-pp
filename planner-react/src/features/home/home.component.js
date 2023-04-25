import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';
import { selectVendor } from '../../slices/vendorSlice';
import VendorHome from './vendorHome.component';

export default function Home() {
// We need to render vendor home page and functionalities
    const user = useSelector(selectUser);
    const vendor = useSelector(selectVendor);

    const { userId } = useParams()

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