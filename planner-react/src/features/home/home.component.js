import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';

export default function Home() {
    const user = useSelector(selectUser);
    const { userId } = useParams()

    return (
        <div>
            <div className='block'>
                <p className='text-2xl text-center my-6'>Hello {user.firstName}!</p>
                <div className='my-4 w-4/5 h-10 mx-auto'>
                    <Link to="/events" className='text-center block border py-1 px-2 rounded-full w-100 h-10 mx-auto'>Create Event</Link>
                </div>
                <div className='my-4 w-4/5 h-10 mx-auto'>
                    <Link to={`/events/user/${userId}`} className='text-center block border py-1 px-2 rounded-full w-100 h-10 mx-auto'>My Events</Link>
                </div>
            </div>
        </div>
    );
}