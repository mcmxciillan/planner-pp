import { Link } from 'react-router-dom';

export default function VendorHome(vendor) {

    console.log("Vendor home", vendor)
    return (
        <div>
            <div>
                <p>{vendor.id}</p>
                <p>{vendor.name}</p>
                <p>{vendor.vendorType}</p>
                <p>Current Rating: {vendor.rating} from <Link to={`/ratings/vendor/${vendor.id}`}>{vendor.ratingCount} ratings</Link></p>
                <ul>
                    <li><Link to={`/events/vendor/${vendor.id}`}>{vendor.name}'s Events</Link></li>
                </ul>
            </div>
        </div>
    )
}