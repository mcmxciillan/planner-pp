import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';

export default function Home() {
// We need to do a check for user roles and render content accordingly.
// Currently we are assuming the user is not a vendor, just a regular user
// We need to render vendor home page and functionalities
    const user = useSelector(selectUser);
    const { userId } = useParams()
    console.log(user)
    return (
        <div>
            <p>{userId}</p>
            <p>Hello {user.firstName} {user.lastName}!</p>
            <ul>
                <li><Link to="/events">Create Event</Link></li>
                <li><Link to={`/events/${userId}`}>My Events</Link></li>
            </ul>
        </div>
    );
}