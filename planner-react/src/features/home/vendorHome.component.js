import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectVendor } from '../../slices/vendorSlice';

export default function VendorHome() {
    const vendor = useSelector(selectVendor)

    return (
        <div>
            <div>
                <p className='text-2xl text-center my-6'>{vendor.name}</p>
                <p className='text-xl text-center my-6'>{vendor.vendorType}</p>
                <p className='text-sm text-center my-6'>Current Rating: {vendor.rating} from <Link to={`/ratings/vendor/${vendor.id}`} className='underline'>{vendor.ratingCount} ratings</Link></p>
                <div className='my-4 w-4/5 h-10 mx-auto'>
                    <Link to={`/events/vendor/${vendor.id}`} className='text-center block border py-1 px-2 rounded-full w-100 h-10 mx-auto'>{vendor.name}'s Events</Link>
                </div>
            </div>
        </div>
    )
}